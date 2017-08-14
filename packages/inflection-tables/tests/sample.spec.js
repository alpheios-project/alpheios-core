// This is a sample test spec to verify that Jest is working
import * as InflectionTables from '../dist/inflection-tables.js';

test('Sample Test Function should return true', () => {
    expect(InflectionTables.langData.test()).toBeTruthy();
});