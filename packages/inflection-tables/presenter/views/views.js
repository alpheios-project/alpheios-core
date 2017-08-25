(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['noun-declension/noun-declension'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(data && data.first),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "            <!-- Gender -->\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(data && data.first),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "                <tr class=\"inflection-table__row\">\r\n                    <td class=\"inflection-table__cell\">Declension Stem</td>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                </tr>\r\n                <tr class=\"inflection-table__row\">\r\n                    <td class=\"inflection-table__cell\">Gender</td>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                </tr>\r\n                <tr class=\"inflection-table__row\">\r\n                    <td class=\"inflection-table__cell\">Type</td>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                </tr>\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                        <!-- Declension -->\r\n                        <td class=\"inflection-table__cell\"  colspan=\"4\">"
    + container.escapeExpression(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"value","hash":{},"data":data}) : helper)))
    + "</td>\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                        <!-- Declension -->\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"8":function(container,depth0,helpers,partials,data) {
    var helper;

  return "                            <!-- Gender -->\r\n                            <td class=\"inflection-table__cell\" colspan=\"2\">"
    + container.escapeExpression(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"value","hash":{},"data":data}) : helper)))
    + "</td>\r\n";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                        <!-- Declension -->\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"11":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                            <!-- Gender -->\r\n                            <td class=\"inflection-table__cell\" colspan=\"2\">\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                            </td>\r\n";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "                                    <!-- Type -->\r\n                                    "
    + container.escapeExpression(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"value","hash":{},"data":data}) : helper)))
    + ((stack1 = helpers.unless.call(alias1,(data && data.last),{"name":"unless","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n";
},"13":function(container,depth0,helpers,partials,data) {
    return "&nbsp;|&nbsp;";
},"15":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "        <!-- Gender -->\r\n        <tr class=\"inflection-table__row\"><td class=\"inflection-table__cell\" colspan=\"31\">"
    + container.escapeExpression(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"value","hash":{},"data":data}) : helper)))
    + "</td></tr>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"16":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "            <!-- Case -->\r\n            <tr class=\"inflection-table__row\">\r\n                <td class=\"inflection-table__cell inflection-table__cell--case-title\">"
    + container.escapeExpression(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"value","hash":{},"data":data}) : helper)))
    + "</td>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </tr>\r\n";
},"17":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                    <!-- Declension -->\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":container.program(18, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"18":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                        <!-- Gender -->\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":container.program(19, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"19":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                            <!-- Type -->\r\n                            <td class=\"inflection-table__cell\">\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":container.program(20, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                            </td>\r\n";
},"20":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "                                    <!-- Endings -->\r\n                                    <a class=\"inflection-table__ending\" title=\""
    + alias4(((helper = (helper = helpers.ending || (depth0 != null ? depth0.ending : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ending","hash":{},"data":data}) : helper)))
    + ", pos: "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.features : depth0)) != null ? stack1.partOfSpeech : stack1), depth0))
    + ", num: "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.features : depth0)) != null ? stack1.number : stack1), depth0))
    + ", case: "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.features : depth0)) != null ? stack1["case"] : stack1), depth0))
    + ", decl: "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.features : depth0)) != null ? stack1.declension : stack1), depth0))
    + ", gend: "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.features : depth0)) != null ? stack1.gender : stack1), depth0))
    + ", type: "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.features : depth0)) != null ? stack1.type : stack1), depth0))
    + "\">"
    + alias4(((helper = (helper = helpers.ending || (depth0 != null ? depth0.ending : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ending","hash":{},"data":data}) : helper)))
    + "&nbsp;"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.footnote : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(21, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</a>"
    + ((stack1 = helpers.unless.call(alias1,(data && data.last),{"name":"unless","hash":{},"fn":container.program(23, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n";
},"21":function(container,depth0,helpers,partials,data) {
    var helper;

  return "["
    + container.escapeExpression(((helper = (helper = helpers.footnote || (depth0 != null ? depth0.footnote : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"footnote","hash":{},"data":data}) : helper)))
    + "]";
},"23":function(container,depth0,helpers,partials,data) {
    return "&nbsp;,&nbsp;";
},"25":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <span><strong>"
    + alias4(((helper = (helper = helpers.index || (depth0 != null ? depth0.index : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + ":</strong> "
    + alias4(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data}) : helper)))
    + "</span><br>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<table class=\"inflection-table\">\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.endings : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.endings : depth0),{"name":"each","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</table>\r\n\r\n<br>\r\n<br>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.footnotes : depth0),{"name":"each","hash":{},"fn":container.program(25, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
})();