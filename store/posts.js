export const namespaced = false
export const state = () => ({
  all:[{
    id:1,
    title:"p1",
    content:"djaosjdoa[ dsoap dmasop dsaop"
  },{
    id:2,
    title:"p2",
    content:"djaosjdoa[ dsoap dmasop dsaop djaosjdoa[ dsoap dmasop dsaop"
  },{
    id:3,
    title:"p3",
    content:"djaosjdoa[ dsoap dsaop"
  }]
})

export const getters = {
  getAll({all}){
    return all;
  }
}