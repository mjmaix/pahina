import chai from 'chai';

import * as func from '../processRecords';
import { ProcessingError } from '../utils/ProcessingError';

const { expect } = chai;

const createEvent = (
  eventName: 'INSERT' | 'MODIFY' | 'REMOVE' | undefined,
) => ({
  eventID: '1',
  eventName,
  eventVersion: '1.1',
  eventSource: 'aws:dynamodb',
  awsRegion: 'ap-southeast-1',
  dynamodb: {},
  eventSourceARN: 'arn',
});

describe('Verify generated GraphQL scripts', function() {
  it('makes single gql command', async () => {
    const event = createEvent('INSERT');
    const records = { Records: [event] };
    const gqls = await func.processRecords(records);

    expect(gqls.length).to.eq(1);
  });

  it('makes multiple gql commands', async () => {
    const event1 = createEvent('INSERT');
    const event2 = createEvent('MODIFY');
    const event3 = createEvent('REMOVE');
    const records = { Records: [event1, event2, event3] };
    const gqls = await func.processRecords(records);

    expect(gqls.length).to.eq(3);
  });

  it('does not gql on empty event', async () => {
    const records = { Records: [] };
    const gqls = await func.processRecords(records);

    expect(gqls.length).to.eq(0);
  });

  it('does not generate gql on unkown event', async () => {
    const event = createEvent(undefined);
    const records = { Records: [event] };
    try {
      func.processRecords(records);
    } catch (err) {
      expect(err).to.be.an.instanceOf(ProcessingError);
    }
  });
});
