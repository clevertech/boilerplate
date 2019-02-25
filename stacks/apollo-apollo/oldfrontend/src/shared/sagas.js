/**
 * Internal function to create async saga action types.
 *
 * @param  String type Type to create
 * @return Object      Containing ACTION|SUCCESS|FAILED properties
 */
export function createSagaAction(type) {
  return {
    ACTION: `${type}.ACTION`,
    SUCCESS: `${type}.SUCCESS`,
    FAILED: `${type}.FAILED`
  };
}
