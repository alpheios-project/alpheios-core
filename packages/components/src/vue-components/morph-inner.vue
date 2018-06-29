<template>
  <div class="alpheios-morph__dictentry">
    <span>
      <span class="alpheios-morph__hdwd alpheios-morph__formtext alpheios-morph__groupitem"
        v-if="! lex.lemma.principalParts.includes(lex.lemma.word)"
        :lang="languageCode(lex.lemma.languageID)">{{ lex.lemma.word }}</span>
      <span class="alpheios-morph__hdwd alpheios-morph__formtext alpheios-morph__groupitem">
        <span class="alpheios-morph__listitem"
          v-for="part in lex.lemma.principalParts" :lang="languageCode(lex.lemma.languageID)">{{ part }}</span>
      </span>
    </span>
    <inflectionattribute :data="lex.lemma.features" :type="types.pronunciation" :linkedfeatures="linkedfeatures" :decorators="['brackets']"/>
    <div class="alpheios-morph__morphdata">
      <span class="alpheios-morph__pofs">
        <inflectionattribute :data="lex.lemma.features" :type="types.grmCase" :linkedfeatures="linkedfeatures" @sendfeature="sendFeature"/>
        <inflectionattribute :data="lex.lemma.features" :type="types.gender" :linkedfeatures="linkedfeatures" @sendfeature="sendFeature"/>
        <inflectionattribute :data="lex.lemma.features" :type="types.part" :linkedfeatures="linkedfeatures" @sendfeature="sendFeature"/>
      </span>
      <inflectionattribute :data="lex.lemma.features" :type="types.kind" :linkedfeatures="linkedfeatures" :decorators="['parenthesize']" @sendfeature="sendFeature"/>
      <inflectionattribute :data="lex.lemma.features" :type="types.declension" :linkedfeatures="linkedfeatures" :decorators="['appendtype']" @sendfeature="sendFeature"/>
      <inflectionattribute :data="lex.lemma.features" :type="types.conjugation" :linkedfeatures="linkedfeatures" :decorators="['appendtype']" @sendfeature="sendFeature"/>
      <inflectionattribute :data="featureList(lex.lemma,['age','area','geo','frequency'],'extras')" :type="'extras'" @sendfeature="sendFeature"/>
      <inflectionattribute :data="lex.lemma.features" :type="types.source" :linkedfeatures="linkedfeatures" :decorators="['brackets']" @sendfeature="sendFeature"/>
      <inflectionattribute :data="lex.lemma.features" :type="types.note" :linkedfeatures="linkedfeatures" :decorators="['brackets']" @sendfeature="sendFeature"/>
    </div>

    <div v-for="definition in definitions" class="alpheios-morph__definition" :data-lemmakey="lex.lemma.ID">
      <shortdef :definition="definition"></shortdef>
    </div>
    <!-- definitions-->

    <lemmatranslation :translations="translations" :lemmakey="lex.lemma.ID"></lemmatranslation>

    <div class="alpheios-morph__inflections">
      <div class="alpheios-morph__inflset" v-for="inflset in inflections">
        <div class="alpheios-morph__forms">
          <span class="alpheios-morph__formtext" data-grouplevel="1" data-feature="prefix" v-if="inflset.groupingKey.prefix">{{inflset.groupingKey.prefix}} </span>
          <span class="alpheios-morph__formtext" data-grouplevel="1" data-feature="stem">{{inflset.groupingKey.stem}}</span>
          <span class="alpheios-morph__formtext" data-grouplevel="1" data-feature="suffix" v-if="inflset.groupingKey.suffix"> -{{inflset.groupingKey.suffix}}</span>
          <span class="alpheios-morph__inflfeatures">
            <inflectionattribute :data="inflset.groupingKey" :type="types.part" :linkedfeatures="linkedfeatures" :grouplevel="1" @sendfeature="sendFeature"
              v-if="! featureMatch(lex.lemma.features[types.part],inflset.groupingKey[types.part])"/>
            <inflectionattribute :data="inflset.groupingKey" :type="types.declension" :linkedfeatures="linkedfeatures" :grouplevel="1" :decorators="['appendtype']"
              @sendfeature="sendFeature" v-if="inflset.groupingKey.declension && ! featureMatch(inflset.groupingKey.declension,lex.lemma.features.declension)"/>
          </span>
          <div class="alpheios-morph__inflgroup" v-for="group in inflset.inflections">
            <span v-if="group.groupingKey.isCaseInflectionSet">
              <inflectionattribute :data="group.groupingKey" :type="types.number" :linkedfeatures="linkedfeatures" :grouplevel="2" @sendfeature="sendFeature"/>
              <inflectionattribute :data="group.groupingKey" :type="types.tense" :linkedfeatures="linkedfeatures" :grouplevel="2" @sendfeature="sendFeature"/>
            </span>
            <div v-for="nextGroup in group.inflections"
              :class="groupClass(group)">
              <span v-if="group.groupingKey.isCaseInflectionSet">
                <inflectionattribute :data="nextGroup.groupingKey" :type="types.tense" :linkedfeatures="linkedfeatures" :grouplevel="3" @sendfeature="sendFeature"/>
                <inflectionattribute :data="nextGroup.groupingKey" :type="types.voice" :linkedfeatures="linkedfeatures" :grouplevel="3" @sendfeature="sendFeature"/>
              </span>
              <span class="alpheios-morph__groupseparator" v-if="group.groupingKey.isCaseInflectionSet && (group.groupingKey[types.number] || group.groupingKey[types.tense] || nextGroup.groupingKey[types.tense] || nextGroup.groupingKey[types.voice])">:</span>
              <div v-for="infl in nextGroup.inflections"
                :class="groupClass(group)">
                  <inflectionattribute :linkedfeatures="linkedfeatures" :type="types.grmCase" :grouplevel="4" :data="infl.groupingKey" @sendfeature="sendFeature"/>
                  <inflectionattribute :linkedfeatures="linkedfeatures" :type="types.gender" :grouplevel="4" :data="infl.groupingKey" :decorators="['parenthesize','abbreviate']"
                    @sendfeature="sendFeature" v-if="! featureMatch(infl.groupingKey[types.gender],lex.lemma.features[types.gender])" />
                  <inflectionattribute :linkedfeatures="linkedfeatures" :type="types.comparison" :grouplevel="4" :data="infl.groupingKey" @sendfeature="sendFeature"/>
                  <inflectionattribute :data="infl.groupingKey" :type="types.person" :linkedfeatures="linkedfeatures" :grouplevel="4" :decorators="['appendtype']" @sendfeature="sendFeature"/>
                  <inflectionattribute :data="infl.groupingKey" :type="types.number" :linkedfeatures="linkedfeatures" :grouplevel="4" @sendfeature="sendFeature"
                    v-if="! group.groupingKey.isCaseInflectionSet"/>
                  <inflectionattribute :data="infl.groupingKey" :type="types.tense" :linkedfeatures="linkedfeatures" :grouplevel="4" @sendfeature="sendFeature"
                    v-if="! group.groupingKey.isCaseInflectionSet"/>
                  <inflectionattribute :data="infl.groupingKey" :type="types.mood" :linkedfeatures="linkedfeatures" :grouplevel="4" @sendfeature="sendFeature"
                    v-if="! group.groupingKey.isCaseInflectionSet"/>
                  <inflectionattribute :data="infl.groupingKey" :type="types.voice" :linkedfeatures="linkedfeatures" :grouplevel="4" @sendfeature="sendFeature"
                    v-if="! group.groupingKey.isCaseInflectionSet"/>
                  <span v-for="item in infl.inflections">
                    <inflectionattribute :data="item" type="example" :linkedfeatures="linkedfeatures" @sendfeature="sendFeature"/>
                  </span>
              </div><!-- end infl -->
            </div><!-- end forms -->
          </div><!-- end groupinflections -->
        </div>
      </div>
    </div><!-- end alpheios-morph__inflections -->


  </div>
</template>
<script>
  import { LanguageModelFactory, GrmFeature } from 'alpheios-data-models'
  import ShortDef from './shortdef.vue'
  import InflectionAttribute from './infl-attribute.vue'

  import LemmaTranslation from './lemma-translation.vue'

  export default {
    name: 'MorphInner',
    components: { shortdef: ShortDef, inflectionattribute: InflectionAttribute, lemmatranslation: LemmaTranslation },
    props: {
        lex: {
          type: Object,
          required: true
        },
        index: {
          type: Number,
          required: true
        },
        count: {
          type: Number,
          required: true
        },
        definitions: {
          type: Array,
          required: false,
          default: () => {[]}
        },
        linkedfeatures: {
          type: Array,
          required: false,
          default: () => []
        },
        translations: {
          type: Object,
          required: false,
          default: () => {}
        },
        morphDataReady: {
          type: Boolean,
          required: true
        }
    },
    data: function () {
      return {
        showSource: false
      }
    },
    created: function () {
      this.types = GrmFeature.types
    },
    computed: {
      inflections: {
        get: function() {
          return this.morphDataReady ? this.lex.getGroupedInflections() : []
        }
      }
    },
    methods: {
      groupClass(group) {
        return group.groupingKey.isCaseInflectionSet ? 'alpheios-morph__inline' : 'alpheios-morph__block'
      },
      featureMatch (a, b) {
        if (a && b) {
          return a.isEqual(b)
        }
        return false

      },
      sendFeature (data) {
        this.$emit('sendfeature',data)
      },
      featureList(lemma,features,name) {
        let list = features.map(i => lemma.features[i] ? GrmFeature.toFeature(lemma.features[i]): null).filter(i => i)
        list = list.length > 0 ? `(${list.map((f)=>f).join(', ')})` : ''
        let returnObj = {}
        returnObj[name] = { value: list }
        return returnObj
      },
      languageCode (languageID) {
        return LanguageModelFactory.getLanguageCodeFromId(languageID)
      }
    }
  }
</script>
<style lang="scss">
  @import "../styles/alpheios";

  .alpheios-morph__lexemes {
    color: $alpheios-tools-color;
  }
  .alpheios-morph__dictentry {
    margin-bottom: .5em;
    padding-bottom: 5px;
    clear: both;
  }

  .alpheios-morph__formtext {
    font-weight: bold;
  }

  .alpheios-morph__dictentry .alpheios-morph__formtext {
    font-size: larger;
  }

  .alpheios-morph__dictentry .alpheios-morph__forms .alpheios-morph__formtext {
    font-size: inherit;
  }

  .alpheios-morph__source {
    font-size: smaller;
    color: $alpheios-toolbar-color;
    font-style: italic;
  }

  .alpheios-morph__dial {
      font-size: smaller;
  }

  .alpheios-morph__attr {
      font-weight: normal;
      padding-right: .25em;
  }

  .alpheios-morph__linkedattr {
    color: $alpheios-link-color;
    font-weight: bold;
    cursor: pointer;
    padding-right: .25em;
  }

  .alpheios-morph__linkedattr:hover {
      color: $alpheios-link-hover-color !important;
  }

  .alpheios-morph__pofs span:last-child:after {
      content: ";";
  }

  .alpheios-morph__inflset {
      margin-left: .5em;
      margin-top: .5em;
  }

  .alpheios-morph__morphdata {
    display: inline;
  }

  .alpheios-morph__inflections, .alpheios-morph__definition, .alpheios-morph__forms {
    margin-left: .5em;
  }

  .alpheios-morph__listitem:after {
      content: ", ";
   }

  .alpheios-morph__listitem:last-child:after {
      content: "";
   }

   .alpheios-morph__list .alpheios-morph__infl:first-child .alpheios-morph__showiffirst {
     display: block;
   }

   .alpheios-morph__list .alpheios-morph__infl .alpheios-morph__showiffirst {
     display: none;
   }

   .alpheios-morph__lexemes .alpheios-definition__lemma {
       display: none;
   }

   div.alpheios-morph__inline {
       display: inline;
   }

   div.alpheios-morph__block {
       display: block;
   }

   .alpheios-panel__tab-panel .alpheios-morph__lexemes {
    font-size: .75rem;
   }

  .alpheios-morph__inflfeatures span:first-child:before {
    content: '(';
  }

  .alpheios-morph__inflfeatures span:last-child:after {
    content: ')';
  }

  .alpheios-morph__groupitem:last-child:after {
    content: ':';
  }
</style>