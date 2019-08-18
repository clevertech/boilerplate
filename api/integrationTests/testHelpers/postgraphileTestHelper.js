// from https://www.graphile.org/postgraphile/testing-jest/

import postgraphilerc from '../../postgraphilerc'

import { postgraphileOptions } from "../../middleware/installPostgraphile"

jest.unmock('pg')
jest.unmock('redis')

const pg = require('pg')
const { createPostGraphileSchema, withPostGraphileContext } = require('postgraphile')
const { graphql } = require('graphql')
const MockReq = require('mock-req')

// This is the role that your normal PostGraphile connection string would use,
// e.g. `postgres://POSTGRAPHILE_AUTHENTICATOR_ROLE:password@host/db`
const POSTGRAPHILE_AUTHENTICATOR_ROLE = "appuser";

/*
 * This function replaces values that are expected to change with static
 * placeholders so that our snapshot testing doesn't throw an error
 * every time we run the tests because time has ticked on in it's inevitable
 * march toward the future.
 */
const sanitise = json => {
  if (Array.isArray(json)) {
    return json.map(el => sanitise(el));
  } else if (json && typeof json === "object") {
    const result = {};
    for (const k in json) {
      if (k === "nodeId") {
        result[k] = "[nodeId]";
      } else if (
        k === "id" ||
        (k.endsWith("Id") && typeof json[k] === "number")
      ) {
        result[k] = "[id]";
      } else if (
        (k.endsWith("At") || k === "datetime") &&
        typeof json[k] === "string"
      ) {
        result[k] = "[timestamp]";
      } else if (
        k.match(/^deleted[A-Za-z0-9]+Id$/) &&
        typeof json[k] === "string"
      ) {
        result[k] = "[nodeId]";
      } else {
        result[k] = sanitise(json[k]);
      }
    }
    return result;
  } else {
    return json;
  }
};

// Contains the PostGraphile schema and rootPgPool
let ctx;

exports.setup = async () => {
  const rootPgPool = new pg.Pool({
    connectionString: process.env.TEST_ROOT_DATABASE_URL,
  });

  const options = postgraphileOptions();
  const schema = await createPostGraphileSchema(
    rootPgPool,
    postgraphilerc.POSTGRAPHILE_SCHEMAS,
    options
  );

  // Store the context
  ctx = {
    rootPgPool,
    options,
    schema,
  };
};

exports.teardown = async () => {
  try {
    if (!ctx) {
      return null;
    }
    const { rootPgPool } = ctx;
    ctx = null;
    await rootPgPool.end();
    return null;
  } catch (e) {
    console.error(e);
    return null;
  }
};

exports.runGraphQLQuery = async function runGraphQLQuery(
  query, // The GraphQL query string
  variables, // The GraphQL variables
  reqOptions, // Any additional items to set on `req` (e.g. `{user: {id: 17}}`)
  checker = () => {} // Place test assertions in this function
) {
  const { schema, rootPgPool, options } = ctx;
  const req = new MockReq({
    url: options.graphqlRoute || "/graphql",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    ...reqOptions,
  });

  const { pgSettings: pgSettingsGenerator } = options;
  const pgSettings =
    typeof pgSettingsGenerator === "function"
      ? await pgSettingsGenerator(req)
      : pgSettingsGenerator;

  await withPostGraphileContext(
    {
      ...options,
      pgPool: rootPgPool,
      pgSettings,
    },
    async context => {
      /* BEGIN: pgClient REPLACEMENT */
      // We're not going to use the `pgClient` that came with
      // `withPostGraphileContext` because we want to ROLLBACK at the end. So
      // we need to replace it, and re-implement the settings logic. Sorry.

      const replacementPgClient = await rootPgPool.connect();
      await replacementPgClient.query("begin");
      await replacementPgClient.query(`select set_config('role', $1, true)`, [
        POSTGRAPHILE_AUTHENTICATOR_ROLE,
      ]);

      const localSettings = new Map();

      // Set the custom provided settings before jwt claims and role are set
      // this prevents an accidentional overwriting
      if (typeof pgSettings === "object") {
        for (const key of Object.keys(pgSettings)) {
          localSettings.set(key, String(pgSettings[key]));
        }
      }

      // If there is at least one local setting.
      if (localSettings.size !== 0) {
        // Actually create our query.
        const values = [];
        const sqlQuery = `select ${Array.from(localSettings)
          .map(([key, value]) => {
            values.push(key);
            values.push(value);
            return `set_config($${values.length - 1}, $${values.length}, true)`;
          })
          .join(", ")}`;

        // Execute the query.
        await replacementPgClient.query(sqlQuery, values);
      }
      /* END: pgClient REPLACEMENT */

      let checkResult;
      try {
        // This runs our GraphQL query, passing the replacement client
        const result = await graphql(
          schema,
          query,
          null,
          {
            ...context,
            pgClient: replacementPgClient,
          },
          variables
        );
        // Expand errors
        if (result.errors) {
          // This does a similar transform that PostGraphile does to errors.
          // It's not the same. Sorry.
          // TODO: use `handleErrors` instead, if present
          result.errors = result.errors.map(rawErr => {
            const e = {
              message: rawErr.message,
              locations: rawErr.locations,
              path: rawErr.path,
            };
            Object.defineProperty(e, "originalError", {
              value: rawErr.originalError,
              enumerable: false,
            });

            if (e.originalError) {
              Object.keys(e.originalError).forEach(k => {
                try {
                  e[k] = e.originalError[k];
                } catch (err) {
                  // Meh.
                }
              });
            }
            return e;
          });
        }

        // This is were we call the `checker` so you can do your assertions.
        // Also note that we pass the `replacementPgClient` so that you can
        // query the data in the database from within the transaction before it
        // gets rolled back.
        checkResult = await checker(result, { pgClient: replacementPgClient });

        // You don't have to keep this, I just like knowing when things change!
        expect(sanitise(result)).toMatchSnapshot();
      } finally {
        // Rollback the transaction so no changes are written to the DB - this
        // makes our tests fairly deterministic.
        await replacementPgClient.query("rollback");
        replacementPgClient.release();
      }
      return checkResult;
    }
  );
};
