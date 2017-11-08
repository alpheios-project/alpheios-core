export { classNames, wideView, narrowView, footnotes, pageHeader }

let classNames = {
  cell: 'infl-cell',
  widthPrefix: 'infl-cell--sp',
  fullWidth: 'infl-cell--fw',
  header: 'infl-cell--hdr',
  highlight: 'infl-cell--hl',
  hidden: 'hidden',
  suffix: 'infl-suff',
  suffixMatch: 'infl-suff--suffix-match',
  suffixFullFeatureMatch: 'infl-suff--full-feature-match',
  inflectionTable: 'infl-table',
  wideView: 'infl-table--wide',
  narrowViewsContainer: 'infl-table-narrow-views-cont',
  narrowView: 'infl-table--narrow',
  footnotesContainer: 'infl-footnotes'
}

let wideView = {
  column: {
    width: 1,
    unit: 'fr'
  }
}

let narrowView = {
  column: {
    width: 100,
    unit: 'px'
  }
}

let footnotes = {
  id: 'inlection-table-footer'
}

let pageHeader = {
  html: `
        <button id="hide-empty-columns" class="switch-btn">Hide empty columns</button><button id="show-empty-columns" class="switch-btn hidden">Show empty columns</button>
        <button id="hide-no-suffix-groups" class="switch-btn">Hide top-level groups with no suffix matches</button><button id="show-no-suffix-groups" class="switch-btn hidden">Show top-level groups with no suffix matches</button><br>
        <p>Hover over the suffix to see its grammar features</p>
        `,
  hideEmptyColumnsBtnSel: '#hide-empty-columns',
  showEmptyColumnsBtnSel: '#show-empty-columns',
  hideNoSuffixGroupsBtnSel: '#hide-no-suffix-groups',
  showNoSuffixGroupsBtnSel: '#show-no-suffix-groups'
}