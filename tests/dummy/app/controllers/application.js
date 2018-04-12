import Controller from '@ember/controller';
import {A} from '@ember/array';
export default Controller.extend({
  data:A(['<img src="http://lorempixel.com/24/24">Monet</img>','Picasso', 'Pollock','Dürer','Banksy']),
  actions:{
    search:function(term){
    console.log(term);
    let result = this.get('data').filter((item)=>{item.includes(term)});
    console.log(result);
    return this.get('data');
  }
}
});
