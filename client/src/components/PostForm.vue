<template>
    <div class="container mt-5">
      <form @submit.prevent="handleSubmit">
        <div class="field">
          <label class="label">Başlık</label>
          <div class="control">
            <input
              v-model="post.title"
              class="input"
              type="text"
              placeholder="Title"
            />
          </div>
        </div>
  
        <div class="field">
          <label class="label">Gönderi içeriği</label>
          <div class="control">
            <textarea
              v-model="post.content"
              class="textarea"
              placeholder="..."
            ></textarea>
          </div>
        </div>
  
        <div class="field">
          <label class="label">Yazar</label>
          <div class="control">
            <input
              v-model="post.creator"
              class="input"
              type="text"
              placeholder="Yazar"
            />
          </div>
        </div>
  
        <div class="field is-grouped">
          <div class="control">
            <button type="submit" class="button is-primary">Submit</button>
          </div>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    props: ['post', 'submitForm'],
  
    methods: {
      handleSubmit() {
       
        this.submitForm();
      }
    }
  }
  </script>
  
  <style></style>
  