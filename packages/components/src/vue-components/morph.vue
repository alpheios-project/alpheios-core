<template>
  <div class="alpheios-morph__lexemes">
    <div class="alpheios-morph__dictentry" v-for="lex in lexemes" v-show="showLexeme(lex)">
      <span class="alpheios-morph__formtext"
        v-if="! lex.lemma.principalParts.includes(lex.lemma.word)"
        :lang="languageCode(lex.lemma.languageID)">{{ lex.lemma.word }}</span>
      <span class="alpheios-morph__formtext">
        <span class="alpheios-morph__listitem"
          v-for="part in lex.lemma.principalParts" :lang="languageCode(lex.lemma.languageID)">{{ part }}</span>
      </span> :
      <span :class="attributeClass(types.pronunciation)"
          v-for="pron in lex.lemma.features[types.pronunciation]"
          v-if="lex.lemma.features[types.pronunciation]">
        [{{pron}}]
      </span>
      <div class="alpheios-morph__morphdata">
        <span class="alpheios-morph__pofs">
          <span @click="sendFeature(gcase)"
            :class="attributeClass(types.grmCase)"
            v-for="gcase in lex.lemma.features[types.grmCase]"
            v-if="lex.lemma.features[types.grmCase]">{{gcase.toString()}}</span>
          <span @click="sendFeature(gender)"
            :class="attributeClass(types.gender)"
            v-for="gender in lex.lemma.features[types.gender]"
            v-if="lex.lemma.features[types.gender]">{{gender.value}}</span>
          <span @click="sendFeature(lex.lemma.features[types.part])"
            :class="attributeClass(types.part)"
            v-if="lex.lemma.features[types.part]">{{ lex.lemma.features[types.part].toString() }}</span>
        </span>
        <span @click="sendFeature(kind)"
          :class="attributeClass(types.kind)"
          v-for="kind in lex.lemma.features[types.kind]"
          v-if="lex.lemma.features[types.kind]">{{kind.value}}</span>
        <span @click="sendFeature(decl)"
          :class="attributeClass(types.declension)"
          v-for="decl in lex.lemma.features[types.declension]"
          v-if="lex.lemma.features[types.declension]">{{decl.value}} declension</span>
        <span @click="sendFeature(conj)"
          :class="attributeClass(types.conjugation)"
          v-for="conj in lex.lemma.features[types.conjugation]"
          v-if="lex.lemma.features[types.conjugation]">{{conj.value}} conjugation</span>
        <span>{{ featureList(lex.lemma,['age','area','geo','frequency']) }}</span>
        <span class="alpheios-morph__attr"
          v-for="source in lex.lemma.features.source" v-if="lex.lemma.features.source">[{{source.value}}]</span>
        <span class="alpheios-morph__attr"
          v-for="note in lex.lemma.features.note" v-if="lex.lemma.features.note">[{{source.note}}]</span>
      </div>
      <div v-if="definitions">
        <div v-for="definition in definitions[lex.lemma.key]" class="alpheios-morph__definition">
          <shortdef :definition="definition"></shortdef>
        </div>
      </div>
      <div class="alpheios-morph__inflections">
        <div class="alpheios-morph__inflset" v-for="inflset in lex.getGroupedInflections()">
          <div class="alpheios-morph__forms">
            <span class="alpheios-morph__formtext" v-if="inflset.groupingKey.prefix">{{inflset.groupingKey.prefix}} </span>
            <span class="alpheios-morph__formtext">{{inflset.groupingKey.stem}}</span>
            <span class="alpheios-morph__formtext" v-if="inflset.groupingKey.suffix"> -{{inflset.groupingKey.suffix}}</span>
            <span @click="sendFeature(inflset.groupingKey[types.part])"
              :class="attributeClass(types.part)"
              v-if="! featureMatch(lex.lemma.features[types.part],inflset.groupingKey[types.part])">
                ({{inflset.groupingKey["part of speech"].toString()}})</span>
            <span @click="sendFeature(infset.groupingKey[types.declension])"
              :class="attributeClass(types.declension)"
              v-if="inflset.groupingKey.declension && inflset.groupingKey.declension !== lex.lemma.features.declension">
                ({{inflset.groupingKey.declension.toString()}})</span>
            <div class="alpheios-morph__inflgroup" v-for="group in inflset.inflections">
              <span @click="sendFeature(group.groupingKey[types.number])"
                :class="attributeClass(types.number)"
                v-if="group.groupingKey[types.number] && group.groupingKey.isCaseInflectionSet">
                  {{ group.groupingKey.number.toString() }}</span>
              <span @click="sendFeature(group.groupingKey[types.tense])"
                :class="attributeClass(types.tense)"
                v-if="group.groupingKey[types.tense] && group.groupingKey.isCaseInflectionSet">
                  {{ group.groupingKey[types.tense].toString() }}</span>
              <div v-for="nextGroup in group.inflections"
                :class="groupClass(group)">
                <span v-if="group.groupingKey.isCaseInflectionSet">
                  <span @click="sendFeature(nextGroup.groupingKey[types.voice])"
                    :class="attributeClass(types.voice)"
                    v-if="group.groupingKey.isCaseInflectionSet && nextGroup.groupingKey.voice">
                    {{ nextGroup.groupingKey[types.voice].toString() }}</span>
                  <span @click="sendFeature(nextGroup.groupingKey[types.tense])"
                    :class="attributeClass(types.tense)"
                    v-if="group.groupingKey.isCaseInflectionSet && nextGroup.groupingKey.tense">
                      {{ nextGroup.groupingKey.tense.toString() }}</span>
                  :
                </span>
                <div v-for="infl in nextGroup.inflections"
                  :class="groupClass(group)">
                    <span @click="sendFeature(infl.groupingKey[types.grmCase])"
                      :class="attributeClass(types.grmCase)"
                      v-if="infl.groupingKey[types.grmCase]">
                      {{ infl.groupingKey[types.grmCase].toString() }}
                      <span @click="sendFeature(infl.groupingKey[types.gender])"
                        :class="attributeClass(types.gender)"
                        v-if="infl.groupingKey[types.gender] && ! featureMatch(infl.groupingKey[types.gender],lex.lemma.features[types.gender]) ">
                        ({{ infl.groupingKey[types.gender].map((g) => g.toLocaleStringAbbr()).toString()}})
                      </span>
                      <span @click="sendFeature(infl.groupingKey[types.comparison])"
                        :class="attributeClass(types.comparison)"
                        v-if="infl.groupingKey[types.comparison]">
                        {{ infl.groupingKey[types.comparison].toString() }}
                      </span>
                    </span>

                    <span @click="sendFeature(infl.groupingKey[types.person])"
                      :class="attributeClass(types.person)"
                      v-if="infl.groupingKey[types.person]">
                      {{ infl.groupingKey[types.person].toString() }} person
                    </span>

                    <span @click="sendFeature(infl.groupingKey[types.number])"
                      :class="attributeClass(types.number)"
                      v-if="infl.groupingKey[types.number] && ! group.groupingKey.isCaseInflectionSet">
                        {{ infl.groupingKey[types.number].toString() }}
                    </span>

                    <span @click="sendFeature(infl.groupingKey[types.tense])"
                      :class="attributeClass(types.tense)"
                      v-if="infl.groupingKey[types.tense] && ! group.groupingKey.isCaseInflectionSet" >
                      {{ infl.groupingKey[types.tense].toString() }}
                    </span>

                    <span @click="sendFeature(infl.groupingKey[types.mood])"
                      :class="attributeClass(types.mood)"
                      v-if="infl.groupingKey[types.mood] && !group.groupingKey.isCaseInflectionSet">
                      {{ infl.groupingKey[types.mood].toString() }}
                    </span>

                    <span @click="sendFeature(infl.groupingKey[types.voice])"
                      :class="attributeClass(types.voice)"
                      v-if="infl.groupingKey[types.voice] && !group.groupingKey.isCaseInflectionSet">
                      {{ infl.groupingKey[types.voice].toString() }}
                    </span>

                    <span v-for="item in infl.inflections">
                      <span class="alpheios-morph__example" v-if="item.example">{{ item.example.toString() }}</span>
                    </span>
                </div><!-- end infl -->
              </div><!-- end forms -->
            </div><!-- end groupinflections -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { LanguageModelFactory, GrmFeature } from 'alpheios-data-models'
  import ShortDef from './shortdef.vue'

  export default {
    name: 'Morph',
    components: { shortdef: ShortDef },
    props: {
        lexemes: {
          type: Array,
          required: true
        },
        definitions: {
          type: Object,
          required: false,
          default: () => {}
        },
        linkedfeatures: {
          type: Array,
          required: false,
          default: () => []
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
    methods: {
      groupClass(group) {
        return group.groupingKey.isCaseInflectionSet ? 'alpheios-morph__inline' : 'alpheios-morph__block'
      },
      attributeClass(featureType,...extras) {
        let classList = []
        if (this.linkedfeatures.includes(featureType)) {
          classList.push('alpheios-morph__linkedattr')
        } else {
          classList.push('alpheios-morph__attr')
        }
        classList.push(...extras)
        return classList.join(' ')
      },
      featureMatch(a,b) {
        let matches = false
        for (let f of a) {
          if (b && b.filter((x) => x.isEqual(f)).length > 0) {
            matches = true
            break
          }
        }
        return matches
      },
      sendFeature(features) {
        let tosend = features
        if (Array.isArray(features)) {
          // TODO eventually we should support multiple features but
          // for the moment just send the first
          tosend = features[0]
        }
        if (this.linkedfeatures.includes(tosend.type)) {
          this.$parent.$emit('sendfeature',tosend)
        }
        else return false
      },
      showLexeme(lex) {
        return lex.isPopulated()
      },
      featureList(lemma,features) {
        let list = features.reduce((acc,cv,ci)=> {
            return lemma.features[cv] ? [...acc,...lemma.features[cv]] : acc
          },[])
        return list.length > 0 ? `(${list.map((f)=>f.toString()).join(', ')})` : ''
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

  .alpheios-morph__inflset h5 {
      display: none;
      font-size: $alpheios-base-font-size;
      line-height: 1;
      margin-bottom: .5em;
  }

  .alpheios-morph__inflset:first-child h5 {
      color: $alpheios-toolbar-color;
      display: block;
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
</style>
