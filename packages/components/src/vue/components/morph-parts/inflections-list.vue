<template>
    <div :class="listClasses" v-if="hasInflections">

        <div class="alpheios-morph__inflset" v-for="(inflset, ifindex) in inflections" v-bind:key="ifindex">

            <span class="alpheios-inflections-list__inflset_index" v-if="inflections.length > 1">{{ ifindex + 1 }}.</span>

            <div class="alpheios-inflections-list__forms">
                <span
                    v-for="feat in featuresList.wordParts.filter(feat => inflset.groupingKey[feat.name])" v-bind:key="feat.name"
                    :lang="languageCode" class="alpheios-inflections-list__formtext"
                    data-grouplevel="1" data-feature="feat.name"
                >{{ feat.template.replace('%s', inflset.groupingKey[feat.name]) }}</span>

                <span class="alpheios-inflections-list__inflfeatures">
                    <inflectionattribute
                        v-for="feat in featuresList.level1.filter(feat => feat.checkfn(inflset))" v-bind:key="feat.name"
                        :data="inflset.groupingKey"  :grouplevel="1"
                        :decorators="feat.decorators"  :type="types[feat.name]"
                    />
                </span>

                <div class="alpheios-inflections-list__inflgroup" v-for="(group, grInflIndex) in inflset.inflections" v-bind:key="grInflIndex">
                    <span v-if="group.groupingKey.isCaseInflectionSet">
                        <inflectionattribute
                            v-for="feat in featuresList.level2" v-bind:key="feat.name"
                            :data="group.groupingKey" :grouplevel="2"
                            :decorators="feat.decorators"
                            :type="types[feat.name]"
                        />
                    </span>


                    <div :class="groupClass(group)" v-for="(nextGroup, nextGrInflIndex) in group.inflections" v-bind:key="nextGrInflIndex">
                        <span v-if="group.groupingKey.isCaseInflectionSet">
                            <inflectionattribute
                                v-for="feat in featuresList.level3" v-bind:key="feat.name"
                                :data="group.groupingKey"  :grouplevel="3"
                                :decorators="feat.decorators"  :type="types[feat.name]"
                            />
                        </span>

                        <div :class="groupClass(group)"  v-for="(infl, nextGrInflIndex2) in nextGroup.inflections" v-bind:key="nextGrInflIndex2">
                            <inflectionattribute
                                v-for="feat in featuresList.level4.filter(feat => feat.checkfn(infl, group))" v-bind:key="feat.name"
                                :data="infl.groupingKey"  :grouplevel="4"
                                :decorators="feat.decorators"  :type="types[feat.name]"
                            />

                            <span v-for="(item, indexItem) in infl.inflections" v-bind:key="indexItem">
                                <inflectionattribute
                                    :data="item"
                                    :decorators="['parenthesize']"
                                    type="dialect"
                                />
                                <inflectionattribute
                                    :data="item"
                                    type="example"
                                />
                            </span>
                        </div>
                    </div>
                    <tooltip
                      :tooltip-text="l10n.getText('TOOLTIP_DISAMBIGUATED')"
                      tooltip-direction="top"
                      class="alpheios-inflections-list__pointer-tooltip"
                      v-show="disambiguated"
                      >
                        <disambiguated-icon class="alpheios-inflections-list__pointer-icn alpheios-disambiguated-icon"></disambiguated-icon>
                      </tooltip>
                      <div v-show="disambiguated" class="alpheios-inflections-list_dsmbg-providers">
                          <tooltip
                              :tooltip-text="l10n.getText('TOOLTIP_TREEBANK_SOURCE')"
                              tooltip-direction="top"
                              class="alpheios-inflections-list__dsmbg-providers-tooltip"
                          >
                              <treebank-icon class="alpheios-inflections-list__dsmbg-providers-icn alpheios-treebank-icon"></treebank-icon>
                          </tooltip>
                      </div>
                </div><!-- alpheios-morph__inflgroup -->

            </div><!-- alpheios-morph__forms -->
        </div><!-- alpheios-morph__inflset -->
    </div><!-- alpheios-morph__inflections -->
</template>
<script>
  import { Feature, LanguageModelFactory } from 'alpheios-data-models'
  import InflectionAttribute from '@/vue/components/infl-attribute.vue'
  import TreebankIcon from '@/images/inline-icons/sitemap.svg'
  import DisambiguatedIcon from '@/images/inline-icons/caret-left.svg'
  import Tooltip from '@/vue/components/tooltip.vue'

  export default {
    name: 'InflectionsList',
    inject: ['app', 'l10n'],
    storeModules: ['app'],
    components: {
      inflectionattribute: InflectionAttribute,
      treebankIcon: TreebankIcon,
      disambiguatedIcon: DisambiguatedIcon,
      tooltip: Tooltip
    },
    props: {
      lexeme: {
        type: Object,
        required: true
      },
      disambiguated: {
        type: Boolean,
        required: true
      },
      listclass: {
        type: String,
        required: false,
        default: ""
      }
    },
    data: function () {
      return {
        types: null, // These are Feature.types
        featuresList: {
          wordParts: [
            { name: 'prefix', template: '%s-'},
            { name: 'stem', template: '%s'},
            { name: 'suffix', template: '-%s'}
          ],
          level1: [
            { name: 'part', decorators: [],
              checkfn: (inflset) => ! this.featureMatch(this.lexeme.lemma.features[this.types.part], inflset.groupingKey[this.types.part])
            },
            { name: 'declension', decorators: ['appendtype'],
              checkfn: (inflset) => inflset.groupingKey.declension && ! this.featureMatch(inflset.groupingKey.declension, this.lexeme.lemma.features.declension)
            },
            { name: 'kaylo', decorators: ['prefixtype'],
              checkfn: (inflset) => inflset.groupingKey.kaylo
            },
            { name: 'state', decorators: ['prefixtype'],
              checkfn: (inflset) => inflset.groupingKey.state
            }
          ],
          level2: [
            { name: 'number', decorators: ['abbreviate'] },
            { name: 'tense', decorators: ['abbreviate'] }
          ],
          level3: [
            { name: 'tense', decorators: ['abbreviate'] },
            { name: 'voice', decorators: ['abbreviate'] }
          ],
          level4: [
            { name: 'grmCase', decorators: ['abbreviate'], checkfn: () => true },
            { name: 'gender', decorators: ['parenthesize','abbreviate'],
              checkfn: (infl, group) => !this.featureMatch(infl.groupingKey[this.types.gender], this.lexeme.lemma.features[this.types.gender])
            },
            { name: 'comparison', decorators: ['abbreviate'], checkfn: () => true },
            { name: 'person', decorators: ['appendtype','abbreviate'], checkfn: () => true },
            { name: 'number', decorators: ['abbreviate'],
              checkfn: (infl, group) => !group.groupingKey.isCaseInflectionSet
            },
            { name: 'tense', decorators: ['abbreviate'],
              checkfn: (infl, group) => true
            },
            { name: 'mood', decorators: ['abbreviate'],
              checkfn: (infl, group) => !group.groupingKey.isCaseInflectionSet
            },
            { name: 'voice', decorators: ['abbreviate'],
              checkfn: (infl, group) => true
            }
          ]
        }
      }
    },
    computed: {
      listClasses () {
        const classNames = ["alpheios-inflections-list__inflections"]
        classNames.push(`alpheios-inflections-list__${this.listclass}`)
        return classNames.join(" ")
      },

      hasInflections () {
        return this.inflections.length > 0
      },

      inflections () {
        if (this.disambiguated) {
          return (
            this.$store.state.app.morphDataReady && this.app.hasMorphData() && this.lexeme.getGroupedSelectedInflection)
            ? this.lexeme.getGroupedSelectedInflection()
            : []

        } else {
          return (
            this.$store.state.app.morphDataReady && this.app.hasMorphData() && this.lexeme.getGroupedInflections)
            ? this.lexeme.getGroupedInflections()
            : []
        }
      },

      languageCode () {
        return LanguageModelFactory.getLanguageCodeFromId(this.lexeme.lemma.languageID)
      }
    },
    methods: {
      groupClass (group) {
        return group.groupingKey.isCaseInflectionSet ? 'alpheios-inflections-list__inline' : 'alpheios-inflections-list__block'
      },

      featureMatch (a, b) {
        if (a && b) {
          return a.isEqual(b)
        }
        return false
      }
    },
    created: function () {
      this.types = Feature.types
    }
  }
</script>
<style lang="scss">
  @import "../../../styles/variables";

  .alpheios-inflections-list__formtext {
    font-weight: 700;
  }

  .alpheios-inflections-list__inflset {
    margin-left: .5em;
    margin-top: .5em;
  }

  .alpheios-inflections-list__inflections div.alpheios-inflections-list__inline {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    span {
      padding-right: .25em;
    }
  }

  div.alpheios-inflections-list__block {
    display: block;
  }

  .alpheios-inflections-list__inflfeatures span:first-child:before {
    content: '(';
  }

  .alpheios-inflections-list__inflfeatures span:last-child:after {
    content: ')';
  }
  .alpheios-inflections-list__inflfeatures, .alpheios-inflections-list__inflgroup {
    display: flex;
    flex-direction: row;
    span {
      padding-right: .25em;
    }
  }

  .alpheios-inflections-list__inflections {
    .alpheios-inflections-list__inflset {
      margin-top: 0;
      margin-left: 7px;

      .alpheios-inflections-list__forms {
        margin-left: 0;
        display: inline-block;
        vertical-align: top;
      }

      .alpheios-inflections-list__inflset_index {
        display: inline-block;
        font-weight: bold;
        vertical-align: top;
        padding-top: 4px;
      }

    }
  }

  .alpheios-inflections-list__pointer {
      &-tooltip {
          display: block;
          height: 22px;
          margin-left: -5px;
      }

      &-icn {
          display: block;
          fill: var(--alpheios-color-vivid);
          height: 22px;
      }
  }

  .alpheios-inflections-list__dsmbg-providers {
      display: block;
      height: 22px;

      &-tooltip {
        margin-left: 5px;
      }

      &-icn {
          fill: var(--alpheios-color-neutral-dark);
          display: block;
          height: 22px;
      }
  }

  .alpheios-inflections-list__dupe-infl-set {
      display: none;
  }
</style>
