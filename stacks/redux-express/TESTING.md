# How to do testing

To start using testing to support your coding you can the following steps:

1. Check you `.env` files so they reflect you testing environment and will connect to the right host/port backend service
2. Start `docker/run-test` to start all required backend services for backend testing
3. Open one terminal window and go to `[project folder]/api` and start `yarn test:watch` for continuous test run
4. Open another terminal window and go to `[project folder]/frontend` and start `yarn test:watch` for continuous test run

If you are on MacOs you can use iTerm for split terminal windows which allows you to have the test runs on one screen and the development tool on the other window to see your test run and which ones are failing. From time to time is good to run all the tests, jest watch has a little menu that allows you to enter options, press `a` to run all tests from time so that not another is failing because of a change you did. You can switch back to options `o` to test only changed files based on hg/git (uncommitted files).

The default output from Jest is to show only the filename of the test and the current status. If one test is filing within that file it will show **FAIL**, if all is good it will show **PASS**. If you want to see individual test suite and test name you need to start your test run with `yarn test:watch --verbose`.

## Backend API testing

Backend testing is typically done via plain unit tests if you test a unit of code that does not need any backend services. Some units need external requirements that are provided by dependency injection, or worst case via manual mocks. These are very simple to test and you utilize mocked components to see if the unit to test is calling these ones as expected.

To see that all things work together, integration testing is used. For these to run, the api server needs to be started and real api requests are send to the server and the result from the requested is checked against the expectations.

The following paragraphs show how to deal with the different types if scenarios.

### Unit/Integration Tests

Create a new file in the same folder as your file to test but with the naming convention `[Filename].spec.js` or `[Filename].test.js`. In this case Jest will find these tests and execute them. If you name the tests with _spec_ Visual Studio Code will show the JS icon in red and makes it easier to distinguish between actual module files and tests.

Use `describe('', () =>{})` to define a test suite. To fine grain tests you can create a `describe` within a `describe`. Use descriptive descriptions so when you see the output, it is clear what you want to test.

Use `it('', () => {})` to write your test. The name of the test should clearly state the expectation. Use the following guideline as a start:

1. What is being tested? For example, the `ProductsService.addNewProduct` method
2. Under what circumstances and scenario? For example, no price is passed to the method
3. What is the expected result? For example, the new product is not approved

Here is an example:

```javascript
//1. unit under test
describe('Products Service', function() {
  describe('Add new product', function() {
    //2. scenario and 3. expectation
    it('When no price is specified, then the product status is pending approval', ()=> {
      const newProduct = new ProductService().add(...);
      expect(newProduct.status).to.equal('pendingApproval');
    });
  });
});
```

Keep your tests clear, short and use BDD styling conventions that is human readable. You can use `Jest.expect` or `chai.expect` to write these. Here is an example that shows, that you can read the expectation and makes it clear what it expects:

```javascript
it("When asking for an admin, ensure only ordered admins in results" , ()={
    //assuming we've added here two admins
    const allAdmins = getUsers({adminOnly:true});

    expect(allAdmins).to.include.ordered.members(["admin1" , "admin2"])
  .but.not.include.ordered.members(["user1"]);
});
```

Test that are defined with `it` run for both **unit** and **integration** tests. There are two aliases, `appUnit` and `integration`, that only run in when you execute the dedicated test run via `yarn test:unit` or `yarn test:integration`. More details later.

You can also run tests async and use async/await:

```javascript
it('Home page should return a message', async () => {
  const res = await fetch('/');
  expect(res.status).toEqual(200);
  expect(await res.text()).toEqual('<p>You shouldnt be here.</p>');
});
```

### Create appUnit Tests

These unit tests are by definition not pure unit test. The procedure can start the application as a full server within the same process. You can test a module by itself as a real unit test or you can make a request to an api entry point and check the expected result. You can check if the data layer was saving the data correctly if you use them as integration tests.

For your test file to use such a in process app server you need to design your test suite as follows:

```javascript
const { initResources, fetch, integration, appUnit, closeResources } = require('../test/utils');

describe('App', () => {
  beforeAll(initResources);
  afterAll(closeResources);
});
```

This will start and stop your application server within the same process. This allows you to intercept external requests or allows for stubs and spies.

To be able to start the application server it needs to have backend services running to receive requests. If you do not have already `docker/run` running you can start all required backend services via `docker/run-test`. This will only start the **DB**, **Redis** and **Adminer**. You might need to check you configuration files that databases exists and are in the state the api server expect it to be.

Within the test you should define such a unit test as follows:

```javascript
appUnit('robots.txt should allow indexing', async () => {
  process.env.ROBOTS_INDEX = 'true';
  const res = await fetch('/robots.txt');
  expect(res.status).toEqual(200);
  expect(await res.text()).toEqual('User-agent: *\nDisallow:\n');
});
```

To make sure your tests are expecting the correct data you should use a test database or a stable database dump that can be seeded all the time you run a test suite. Otherwise you can't be sure that the data you retrieve is all the time the same.

You also need to make sure that your database has the latest migrations executed. You can do that via:

```bash
yarn knex --knexfile ./knexfile.js migrate:latest
```

### Create Integrations Tests

These integration test are suppose to run against a running `docker/run` environment and will not start a local app server within the process. These tests should simulate a test against a production deployment even when the resources and backend services run on the local machine. It is the closest it can get to a production environment.

Within the test you should define such a unit test as follows:

```javascript
integration('robots.txt should allow indexing', async () => {
  process.env.ROBOTS_INDEX = 'true';
  const res = await fetch('/robots.txt');
  expect(res.status).toEqual(200);
  expect(await res.text()).toEqual('User-agent: *\nDisallow:\n');
});
```

These test run against your play database and the data result can be different depending on your development and testing. These test should be designed to test server specifics and functionalities rather than the data output.

### External API calls interception

If you have an external API that your module is calling and you want to test different scenarios, for example a socket hangup or timeout or a 500 response, you can use `nock` to simulate that. [Nock](https://github.com/nock/nock) is basically intercepting the call and response with your defined response instead. Here is a little example.

```javascript
it('should return 500 error if greenhouse api response with 403 error', done => {
  nock('https://harvest.greenhouse.io')
    .get('/v1/jobs/?per_page=500&status=open')
    .reply(
      401,
      { message: 'Invalid Basic Auth credentials' },
      {
        'Content-Type': 'application/json'
      }
    );

  config.request
    .get('/api/v2/jobs/greenhouse')
    .set('Authorization', `JWT ${adminToken}`)
    .expect(500)
    .end(done);
});

it('should return 500 error if greenhouse api response with socket error', done => {
  nock('https://harvest.greenhouse.io')
    .get('/v1/jobs/?per_page=500&status=open')
    .replyWithError({ code: 'ETIMEDOUT' });

  config.request
    .get('/api/v2/jobs/greenhouse')
    .set('Authorization', `JWT ${adminToken}`)
    .expect(500)
    .end(done);
});
```

### Environment Variables

It does not matter which test you run, it always uses the `.env` file for the configuration of the connectivity to your backend services. Please ensure before you start your tests that you have the correct values set.

If you use `.env.integration` or `.env.test` to start these different values, make sure they are not committed to git and are ignored.

If you do not set them correctly it might happen that your tests run into a timeout because the app server is not properly started and requests are timing out because no response or response data. The first place to look into.

### Tagging Your Tests

Use tags in your suite and test names to be able to run only them and not all the time all tests, which can be slow:

```javascript
describe('App', () => {
  beforeAll(initResources);
  afterAll(closeResources);

  it('#home page should return a message', async () => {
    const res = await fetch('/');
    expect(res.status).toEqual(200);
    expect(await res.text()).toEqual('<p>You shouldnt be here.</p>');
  });

  it('#healthz should return a JSON with status OK', async () => {
    const res = await fetch('/healthz');
    expect(res.status).toEqual(200);
    expect(await res.json()).toEqual({ status: 'OK' });
  });
});
```

When you run `yarn test:integration -t=#home` it will only run the test with `#home` in the description.

## Frontend Testing

Front end testing is a bit more complicated as it involves different areas that need to be tested. One test is the component itself and how it renders itself with various different properties and states. They also depend sometimes on user interaction that need to be simulated. The other area is the state management and the middleware to request and receive data from the api server or other resources.

### Testing your Reducer, ActionCreators and Api

Here I will dive into the redux environment and how you can test it. The middleware layer is shown later in an own paragraph.

#### Action Creators

The Action Creators are plain simple functions that expect method parameters or an object and return an object in from of `{ type: 'xxxx' }`. These tests are simple and straight forward und here is an example test for it:

```javascript
describe('#redux #authentication', () => {
  describe('#actionCreators', () => {
    it('login should return correct type and payload', () => {
      const result = actions.login({ username: 'manfred', password: 'supereasy' });

      expect(result.type).toEqual(constants.AUTHENTICATION_LOGIN.ACTION);
      expect(result.username).toEqual('manfred');
      expect(result.password).toEqual('supereasy');
    });
  });
});
```

#### Reducers

The reducer is also quite simple as it is a plain function that takes an initial state, current state and the action with payload as arguments. Here is also a simple example of the login routine. This example uses a helper to make the language more fluent and better readable in BDD style. It checks as well that the state is immutable has not changed.

```javascript
describe('#redux #authentication', () => {
  describe('#reducer', () => {
    it('should return initial state', () => {
      expect(authentication(undefined, {})).toEqual({})
    })

    it('should handle AUTHENTICATION_LOGIN.ACTION', () => {
      const action = { type:   constants.AUTHENTICATION_LOGIN.ACTION }
      const result = { error: null, loggingIn: true }

      Reducer(authentication)
        .expect(action)
        .toReturnState(result)
    })

    it('should handle AUTHENTICATION_LOGIN.SUCCESS', () => {
      const state = { error: null, loggingIn: true }
      const action = {
        type: constants.AUTHENTICATION_LOGIN.SUCCESS,
        payload: {
          email: 'manfred@client.com',
          accessToken: 'abcdefg'
        }
      }
      const result = {
        email: 'manfred@client.com',
        accessToken: 'abcdefg'
      }

      Reducer(authentication)
        .withState(state)
        .expect(action)
        .toReturnState(result)
    })

    it('should handle AUTHENTICATION_LOGIN.FAILED', () => {
      const state = { error: null, loggingIn: true }
      const action = {
        type: constants.AUTHENTICATION_LOGIN.FAILED,
        message: 'error happened'
      }
      const result = {
        error: 'error happened'
      }

      Reducer(authentication)
        .withState(state)
        .expect(action)
        .toReturnState(result)
    })
} )
```

#### API calls

Because the api is typically a plain simple fetch to the backend, the test just need to cover that the payload that the api function receives is shown as part of the request to the server and the correct url is fetched. In some cases you might want to test a negative response and how you handle return this error to the middleware.

To be able to test, we need to intercept the actual fetch and check that the expected url was called with the correct query string or body. On top of that we can hand back a response and see and check that the api call function returns the received data in the expected way.

Here is an example that uses `nock` for intercepting the fetch request and reply with a certain response. I created helper function for the base setup and your tests need to include the test setups at the beginning of your test file and not within your `describe` method.

```javascript
import { nockBeforeEach, nockAfterEach } from '../../../test/helpers'; // path changes very likely

beforeEach(() => {
  nockBeforeEach();
});

afterEach(() => {
  nockAfterEach();
});
```

The test itself is also straight forward:

```javascript
describe('#authentication #api login', () => {
  it('should call [server]/api/users/login and return response', async () => {
    const body = { username: 'manfred', password: 'supereasy' };
    const response = {
      token: 'ABCDEF'
    };
    nock(API_BASE)
      .post('/api/users/login', body)
      .reply(200, response);

    await expect(login(body)).resolves.toEqual(response);
  });

  it('should throw error if api returns error', async () => {
    const body = { username: 'manfred', password: 'supereasy' };
    const response = {
      error: 'this is an error'
    };
    nock(API_BASE)
      .post('/api/users/login', body)
      .reply(500, response);

    await expect(login(body)).rejects.toThrow('this is an error');
  });
});
```

### Testing your redux-saga middleware

The redux-saga middleware can be tested, but you need a test library to test it efficiently. This application uses **redux-saga-test-plan** for easy saga testing. But to be able to do it you need to export all functions so they are available in the test file.

#### Testing the rootSaga

This part can be done but not very nicely. It does the job and ensures that when the application is running, all sagas are utilised. Here is an example:

```javascript
export function* rootSaga() {
  yield all([fork(watchGetAccount), fork(watchLogin), fork(watchLogoutUser)]);
}

describe('#redux #authentication #saga', () => {
  describe('#rootSaga and #watch', () => {
    it('rootSaga should contain all forked watchers ', () => {
      testSaga(rootSaga)
        .next()
        .all([fork(watchGetAccount), fork(watchLogin), fork(watchLogoutUser)]);
    });
  });
});
```

#### Testing the watchers

The watchers are also simple functions that can be easily checked. You need to import the watch function and therefore you need to export function in the implementation file.

```javascript
export function* watchGetAccount() {
  yield takeLatest(constants.AUTHENTICATION_GET_ACCOUNT.ACTION, getAccount);
}

describe('#redux #authentication #saga', () => {
  describe('#rootSaga and #watch', () => {
    it('watchGetAccount should takeLatest', () => {
      testSaga(watchGetAccount)
        .next()
        .takeLatestEffect(constants.AUTHENTICATION_GET_ACCOUNT.ACTION, getAccount);
    });
  });
});
```

#### Testing the actual redux-saga middleware

The saga typically has some complexity, typically an api call is executed and a new dispatch action is started. Very often other calls or failures need to be checked as well. To be able to test it, the saga function needs to be exported.

Here is a very typical example that we would like to test:

```javascript
export function* login(action) {
  try {
    const payload = yield call(api.login, action);
    yield put({ type: constants.AUTHENTICATION_LOGIN.SUCCESS, payload });
    yield call(history.push, '/');
  } catch (e) {
    yield put({
      type: constants.AUTHENTICATION_LOGIN.FAILED,
      message: e.message || e
    });
  }
}
```

The first test we need to do is the positive test that the api is called, the sucess message is dispatched and the history received a new target. Very convenient is that **redux-saga-test-plan** allows you to mock the api call, within the provide method, and lets you to define a default return value.

```javascript
describe('#redux #authentication #saga', () => {
  describe('login saga', () => {
    it('should login the user successfully', () => {
      const action = {
        type: constants.AUTHENTICATION_LOGIN.ACTION,
        username: 'jeremy',
        password: 'easy'
      };
      const fakeUser = { user: { name: 'Jeremy' }, token: 'ABCDEF' };

      return expectSaga(login, action)
        .provide([[matchers.call.fn(api.login), fakeUser]])
        .call(api.login, action)
        .put({
          type: constants.AUTHENTICATION_LOGIN.SUCCESS,
          payload: { user: { name: 'Jeremy' }, token: 'ABCDEF' }
        })
        .call(history.push, '/')
        .run();
    });
  });
});
```

After we have done the positive test we also need to check the case were the api call returns an error. **redux-saga-test-plan** allows you to easily throw an error as part of the provide call.

```javascript
describe('#redux #authentication #saga', () => {
  describe('login saga', () => {
    it('should send redux action AUTHENTICATION_LOGIN.FAILED if api returns error', () => {
      const action = {
        type: constants.AUTHENTICATION_LOGIN.ACTION,
        username: 'jeremy',
        password: 'easy'
      };
      const error = new Error('fake error');

      return expectSaga(login, action)
        .provide([[matchers.call.fn(api.login), throwError(error)]])
        .call(api.login, action)
        .put({
          type: constants.AUTHENTICATION_LOGIN.FAILED,
          message: 'fake error'
        })
        .run();
    });
  });
});
```

Depending on the complexity of your saga, you might need to test various different effects. The library provides for all saga effects test expectations that makes it easy to test your different scenarios.

### Testing your containers or components

There are several ways to test your container or component. One is to make a snapshot of a current render output based on certain properties. If something changes the test will fail because the stored snapshot differs from rendered one. This is not directly helpful during development but can provide you with a hint that something changed and that has an effect on the rendering.

The other options is to use Enzyme to shallow render the component and to test the output. It also allows you to simulate certain events that then changes the rendering or dispatches actions.

Component testing is more complex if the component does too many things. The React principle to keep components small comes in handy here.

The following example shows how to use a mocked redux store and enzyme to test the render output. First we need to create a mock redux store that can be used by `mapStateToProps` and `mapDispatchToProps` to inject properties and actions creators into properties.

```javascript
import configureMockStore from 'redux-mock-store';
// Create the mock store
const mockStore = configureMockStore();

const store = mockStore(storeWithUser);
const wrapper = shallow(
  <EnsureAuthenticated store={store}>
    <NoMatch />
  </EnsureAuthenticated>
);
```

If your container is wrapped within a `withRouter` HoC you should consider exporting the connected component with an own variable and use the variable for the export default part.

```javascript
export const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
export default withRouter(ConnectedApp);
```

The redux-mock-store does not really work nicely if it wrapper is within a `withRouter` HoC.

To test a component after rendering, enzyme provides different types of selectors to find a component. A best way to ensure that you find your component is to use the `id` field. Very often you don't have that and adding can be problematic, using `className` is possible but very often not unique. A way out of that is to add a new property `data-testid` and find for this one instead by using `wrapper.find({'data-testid': '[your id]})`.

Here is an example of how you can use Enzyme:

```javascript
describe('#container #EnsureAuthenticated', () => {
  it('should render children if props has a user', () => {
    const store = mockStore(storeWithUser);
    const wrapper = shallow(
      <EnsureAuthenticated store={store}>
        <NoMatch />
      </EnsureAuthenticated>
    ).dive();

    expect(wrapper.find(NoMatch)).toHaveLength(1);
  });

  it('should render <Redirect /> to login', () => {
    const store = mockStore(storeWithoutUser);
    const wrapper = shallow(
      <EnsureAuthenticated store={store}>
        <NoMatch />
      </EnsureAuthenticated>
    ).dive();

    expect(wrapper.find(Redirect)).toHaveLength(1);
    expect(wrapper.find(Redirect).props().to).toEqual('/login');
  });

  it('should render nothing if no children provided', () => {
    const store = mockStore(storeWithUser);
    const wrapper = shallow(<EnsureAuthenticated store={store} />).dive();

    expect(wrapper.children()).toHaveLength(0);
  });
});
```

The `.dive()` option was necessary in this case because the actual component was within the `connect()` HoC. Every time you use a HoC you need to use `.dive()` to reach one level down until you reach your component. This can cause issues with the renderer, not all HoC work well with it.

Another important part of component testing are events that are fired. Enzyme allows you to simulate an event, it can be `change`, `click` or `submit` etc. The following example shows a test for a simple Login component with a change and submit event:

```javascript
describe('#container #login', () => {
  it('should call login() with userName and password after submit', () => {
    const actionsLogin = jest.spyOn(actions, 'login');
    const store = mockStore(storeData);
    const wrapper = shallow(<Login store={store} />)
      .dive()
      .dive();
    const userNameWrapper = wrapper.find({ 'data-testid': 'userName' });
    const passwordWrapper = wrapper.find({ 'data-testid': 'password' });
    const formWrapper = wrapper.find({ 'data-testid': 'form' });
    userNameWrapper.simulate('change', { target: { value: 'manfred' } });
    passwordWrapper.simulate('change', { target: { value: 'supereasy' } });
    formWrapper.simulate('submit'); // you need to call subkmit on the form,
    // button click does not work

    expect(actionsLogin).toHaveBeenCalledWith({ username: 'manfred', password: 'supereasy' });
  });
});
```

### Mocks

Jest allows you to easily mock functions that can be used if you need a callback for example. Or you can mock a whole library/module. It is very important to follow an order of your imports Jest can only mock such a module if it is imported before it is used in any other module, especially the module you want to test. Here is the example of the authentication api test, that shows, how you would use a mock.

I wanted to mock the redux/store.js file that is used in shared/request.js to add the token from the current logged in user.

```javascript
jest.mock('../store'); // first create mock of the module
const { login, getAccount } = require('./authentication'); // then import you module you want to
//  test that also uses the mocked module
let store = require('../store'); // now load the module to create you subs
```

Now we can create a replacement for the actual call with the options to test if the mock function was called and what return value we would like to have. Here is the most common case and can be used within a test or in a `beforeXXX` function.

```javascript
store.default.getState.mockReturnValue({
  authentication: {
    token: 'ABCDEF'
  }
});
```

It is also good practise to cleanup after each test:

```javascript
afterEach(() => {
  jest.restoreAllMocks();
});
```

### Spies

Spies can be helpful to identify if a method was called. They are simple to use:

```javascript
import { actions } from '../redux/modules/authentication';
import Account from './Account';

describe('#container #Account', () => {
  it('should call getAccount in componentDidMount', () => {
    const componentDidMount = jest.spyOn(Account.prototype, 'componentDidMount');
    const actionsGetAccount = jest.spyOn(actions, 'getAccount');
    const store = mockStore(storeState);
    mount(<Account store={store} />);

    expect(componentDidMount).toHaveBeenCalled();
    expect(actionsGetAccount).toHaveBeenCalled();
  });
});
```

## Things To Read

- All Jest.expect methods: https://jestjs.io/docs/en/expect
- Common Jest cases: https://devhints.io/jest
- Sinon mocks for Jest: https://github.com/maurocarrero/sinon-jest-cheatsheet
- Intercepting fetches: https://github.com/nock/nock
- Enzyme Shallow Method: https://airbnb.io/enzyme/docs/api/shallow.html
- Redux Writing Tests: https://redux.js.org/recipes/writing-tests
- Redux Testing Step-by Step: https://hackernoon.com/redux-testing-step-by-step-a-simple-methodology-for-testing-business-logic-8901670756ce
- For Reducer Testing: https://www.npmjs.com/package/redux-testkit
- Saga testing: http://redux-saga-test-plan.jeremyfairbank.com/
