import * as Lib from "../../lib/lib.js";
import Handlebars from "../support/handlebars-4.0.10/handlebars-v4.0.10";  // CommonJS module
//export {View};

class View {
    /**
     * A compare function that can be used to sort ending according to specific requirements of the current view.
     * This function is for use with Array.prototype.sort().
     * @param {FeatureType[]} featureOrder
     * @param {Suffix} a
     * @param {Suffix} b
     */
    compare(featureOrder, a, b) {
        "use strict";

        // Set custom sort order if necessary
        // Custom sort order for each declension
        //LibLatin.genders.order = [LibLatin.genders.feminine];


        for (let [index, feature] of this.featureOrder.entries()) {
            let featureTypeA = a.features[feature.type],
                featureTypeB = b.features[feature.type];

            if (feature.orderLookup[featureTypeA] > feature.orderLookup[featureTypeB]) {
                return 1;
            }
            else if (feature.orderLookup[featureTypeA] < feature.orderLookup[featureTypeB]) {
                return -1;
            }
            /*
             If values on this level are equal, continue comparing using values of the next level.
             If we are at the last level of comparison (defined by featureOrder) and elements are equal, return 0.
             */
            else if (index === this.featureOrder.length - 1) {
                // This is the last sort order item
                return 0;
            }
        }

    }

    /**
     * Returns true if an ending grammatical feature defined by featureType has value that is listed in featureValues array.
     * This function is for use with Array.prototype.filter().
     * @param {FeatureType} featureType - a grammatical feature type we need to filter on
     * @param {Feature[]} featureValues - a list of possible values of a type specified by featureType that
     * this ending should have
     * @param {Suffix} suffix - an ending we need to filter out
     * @returns {boolean}
     */
    filter(featureType, featureValues, suffix) {
        "use strict";

        // If not an array, convert it to array for uniformity
        if (!Array.isArray(featureValues)) {
            featureValues = [featureValues];
        }
        for (const value of featureValues) {
            if (suffix.features[featureType] === value) {
                return true;
            }
        }

        return false;
    }

    filterByFeature(features, suffixMatch, suffix) {
        "use strict";

        let result = true;
        for (let feature of features) {
            let featureValues = feature.value;
            let featureType = feature.type;
            if (!Array.isArray(featureValues)) {
                featureValues = [featureValues];
            }
            result = result && featureValues.includes(suffix.features[featureType]);
        }
        // Whether to check for a suffix match
        if (suffixMatch) {
            result = result && suffix.match.suffixMatch;
        }

        return result;
    }

    /**
     * This function provide a view-specific logic that is used to merge two suffixes together when they are combined.
     * @param {Suffix} suffixA - A first of two suffixes to merge (to be returned).
     * @param {Suffix} suffixB - A second ending to merge (to be discarded).
     * @returns {Suffix} A modified value of ending A.
     */
    merge(suffixA, suffixB) {
        let commonGroups = Lib.Suffix.getCommonGroups([suffixA, suffixB]);
        for (let type of commonGroups) {
            // Combine values using a comma separator. Can do anything else if we need to.
            suffixA.features[type] = suffixA.features[type] + ', ' + suffixB.features[type];
        }
        return suffixA;
    }

    /**
     * A recursive function that organizes suffixes by features from a groupFeatures list into a multi-dimensional
     * array. Each of levels of this array corresponds to a feature from a groupFeatures list.
     * @param {Suffix[]} suffixes - A list of suffixes.
     * @param {FeatureType[]} groupFeatures - A list of feature types to be used for grouping.
     * @param {function} mergeFunction - A function that merges two suffixes together.
     * @param {Feature[]} featureValues - A list of feature values for the current level
     * @param {number} currentLevel - A recursion level, used to stop recursion.
     * @returns {Suffix[]} Endings grouped into a multi-dimensional array.
     */
    groupByFeature(suffixes, groupFeatures, mergeFunction, featureValues = [], currentLevel = 0) {
        let feature = groupFeatures[currentLevel];
        let grouped = [];
        let currentFeatures = featureValues.slice();

        for (const featureValue of feature.orderIndex) {
            currentFeatures.push(feature.get(featureValue));
            let empty = !suffixes.find(element => {
                if (element.features[feature.type] === featureValue) {
                    return element;
                }
            });

            let featureValuesList = currentFeatures.map(feature => feature.value);
            let rowValues = undefined;
            let columnValues = undefined;
            if (currentLevel === groupFeatures.length - 1) {
                rowValues = featureValuesList[0] + ' ' + featureValuesList[1];
                columnValues = featureValuesList[2] + ' ' + featureValuesList[3] + ' ' + featureValuesList[4];
            }

            let result = {
                type: feature.type,
                value: featureValue,
                tableGroup: feature.tableGroup,
                tableGroupSel: feature.tableGroupSel,
                empty: empty.toString(),
                rowValues: rowValues,
                columnValues: columnValues,
                featureValues: currentFeatures.map(feature => feature.value).join(', ')
            };
            let selected = suffixes.filter(this.filter.bind(this, feature.type, featureValue));
            if (currentLevel < groupFeatures.length - 1) {
                // Split more
                featureValues.push(feature.get(featureValue));
                selected = this.groupByFeature(selected, groupFeatures, mergeFunction, featureValues, currentLevel + 1);
            }
            else {
                // This is the last level
                // Split result has a list of suffixes in a table cell. We can now combine duplicated items if we want
                if (selected.length > 0) {
                    selected = Lib.Suffix.combine(selected, mergeFunction);
                }

                if (selected.length === 0) {
                    // No suffixes in this column
                    result.empty = 'true'; // For a template output
                }
                else {
                    result.empty = 'false';
                }

                result.suffixMatch = 'false';
                for (let element of selected) {
                    if (element.match.suffixMatch) {
                        result.suffixMatch = 'true';
                        break;
                    }
                }

            }
            result.data = selected;
            grouped.push(result);

            currentFeatures.pop();
        }
        featureValues.pop();
        return grouped;
    }

    addHeaders(displayData, suffixes) {
        displayData.headers = [[], [], []];

        // Set left column data
        displayData.headers[0].push({
            title: this.featureOrder[2].type
        });
        displayData.headers[1].push({
            title: this.featureOrder[3].type
        });
        displayData.headers[2].push({
            title: this.featureOrder[4].type
        });

        let columnsEmptyTotal = 0;

        for (let featureValue2 of this.featureOrder[2].orderIndex) {
            // Declensions
            let columnsEmpty2 = 0;
            let suffixMatch2 = false;

            let header2 = {
                title: featureValue2,
                size: this.featureOrder[3].orderIndex.length * this.featureOrder[4].orderIndex.length
            };

            for (let featureValue3 of this.featureOrder[3].orderIndex) {
                // Genders
                let header3 = {
                    title: featureValue3,
                    size: this.featureOrder[4].orderIndex.length
                };

                let columnsEmpty3 = 0;
                let suffixMatch3 = false;

                for (let featureValue4 of this.featureOrder[4].orderIndex) {
                    // Types
                    let empty = !suffixes.find(this.filterByFeature.bind(this, [
                        new Lib.Feature(featureValue2, 'declension', Lib.languages.latin),
                        new Lib.Feature(featureValue3, 'gender', Lib.languages.latin),
                        new Lib.Feature(featureValue4, 'type', Lib.languages.latin)
                    ], false));

                    let suffixMatch = !!suffixes.find(this.filterByFeature.bind(this, [
                        new Lib.Feature(featureValue2, 'declension', Lib.languages.latin),
                        new Lib.Feature(featureValue3, 'gender', Lib.languages.latin),
                        new Lib.Feature(featureValue4, 'type', Lib.languages.latin)
                    ], true));

                    if (empty) {
                        columnsEmpty2++;
                        columnsEmpty3++;
                        columnsEmptyTotal++;
                    }
                    suffixMatch2 = suffixMatch2 || suffixMatch;
                    suffixMatch3 = suffixMatch3 || suffixMatch;

                    displayData.headers[2].push({
                        headerLevel: 3,
                        title: featureValue4,
                        size: 1,
                        empty: empty,
                        columnsEmpty: 0,
                        columnsTotal: 1,
                        suffixMatch: suffixMatch,
                        featureValues: featureValue2 + ' ' + featureValue3 + ' ' + featureValue4
                    });
                }

                header3.headerLevel = 2;
                header3.columnsTotal = this.featureOrder[4].orderIndex.length;
                header3.columnsEmpty = columnsEmpty3;
                if (columnsEmpty3 === header3.columnsTotal) {
                    header3.empty = true;
                }
                header3.suffixMatch = suffixMatch3;
                header3.featureValues = featureValue2 + ' ' + featureValue3;

                displayData.headers[1].push(header3);
            }

            header2.headerLevel = 1;
            header2.columnsTotal = this.featureOrder[3].orderIndex.length * this.featureOrder[4].orderIndex.length;
            header2.columnsEmpty = columnsEmpty2;
            if (columnsEmpty2 === header2.columnsTotal) {
                header2.empty = true;
            }
            header2.suffixMatch = suffixMatch2;
            header2.featureValues = featureValue2;

            displayData.headers[0].push(header2);
        }
    }

    /**
     * Converts a ResultSet, returned from inflection tables library, into an HTML representation of an inflection table.
     * @param {ResultSet} resultSet - A result set from inflection tables library.
     * @returns {string} HTML code representing an inflection table.
     */
    render(resultSet) {
        "use strict";

        // We can sort suffixes if we need to
        //let sorted = resultSet.suffixes.sort(compare.bind(this, featureOrder));

        // Create data structure for a template
        let displayData = {};

        displayData.word = resultSet.word;
        let selection = resultSet[this.partOfSpeech];
        displayData.suffixes = this.groupByFeature(selection.suffixes, this.featureOrder, this.merge);
        this.addHeaders(displayData, selection.suffixes);
        displayData.footnotes = selection.footnotes;

        let compiled = Handlebars.compile(this.template);

        return compiled(displayData);
    }
}

export default View;