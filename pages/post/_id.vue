<template>
  <div class="container">
    <article>
      <h1>{{$route.params.id}}</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum adipisci magni voluptate! Fugiat, illo! Placeat exercitationem enim ut similique quisquam pariatur rem sequi accusamus optio quis eligendi sit, praesentium cum?</p>
      <p>{{$store.getters.getAll}}</p>
    </article>
    <a href="/post/p1">see p1</a>
    <a href="/post/p2">see p2</a>
    <nuxt-link :to="{name:'post-id',params:{id:'p3'}}">p3</nuxt-link>
  </div>
</template>

<script>
export default {
  created(){
    console.log(this.$route.params.id)
    console.log(this.$store.getters.getAll)
  },
  head(){
    return{
      title:'Post',
      meta:[
        {name:'twitter:title',content:"contentcontentcontent"},
        {name:'twitter:description',content:"descriptiondescriptiondescription"},
      ]
    }
  }

}
</script>

<style lang="scss" scoped>
.container{
  width: 90%;
  p{
    color:white;
  }
}
</style>