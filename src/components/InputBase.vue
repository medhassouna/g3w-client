<!-- ORIGINAL SOURCE: -->
<!-- gui/inputs/baseinput/baseinput.html@v3.4 -->
<!-- gui/inputs/baseinput/baseinput.js@v3.4 -->

<template>
  <div class="form-group">
    <slot name="label">
      <label :for="state.name" class="col-sm-4 control-label">{{ state.label }}
        <span v-if="state.validate && state.validate.required">*</span>
        <i v-if="showhelpicon" :class="g3wtemplate.font['info']" class="skin-color" style="margin-left: 3px; cursor: pointer" @click="showHideHelp"></i>
        <slot name="label-action"></slot>
      </label>
    </slot>
    <div class="col-sm-8">
      <slot name="loading"></slot>
      <slot name="body"></slot>
      <slot name="message">
        <p v-if="notvalid" class="error-input-message" style="margin: 0" v-html="state.validate.message"></p>
        <p v-else-if="state.info" style="margin: 0 " v-html="state.info"></p>
      </slot>
      <div class="g3w_input_help skin-background-color extralighten" v-if="state.help && this.state.help.visible" v-html="state.help.message">
      </div>
    </div>
  </div>
</template>

<script>
  const {baseInputMixin:BaseInputMixin} = require('gui/vue/vue.mixins');

  export default {
    name: "InputBase",
    props: ['state'],
    ...BaseInputMixin
  }
</script>

<style scoped>

</style>