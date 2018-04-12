import Texta from '@ember/component/text-area';
import {A} from '@ember/array';
import { Textarea,Textcomplete }  from 'textcomplete';
/**
 *  matcher can only be changed at start.
 * you can register strategies later via textcomplete
 */
export default Texta.extend({
  editor:null,
  textcomplete:null,
  matcher:  /(^|\s)@(\w+)$/,
  data: A(),
  filterFunction: function(text){
    return (item)=>{
      return item.includes(text);
  }
  },
  search: function(term){
    let filterFunc = this.get('filterFunction')(term);
    return this.get('data').filter(filterFunc);
  },
  _search: function(term,callback,self){
    let result =self.search(term);
    if(result.then!=null){
      result.then((data)=>{
        callback(data);
      });
    } else {
      callback(result);
    }
  },
  replaceFunction: function(value){
    return '$1\${' + value + '} ';
  }
  templateFunction: function(value){
    return value;
  }
,
  didInsertElement: function() {
    this.editor = new Textarea(this.get('element'));
    this.textcomplete = new Textcomplete(this.editor);
    let self= this;
    this.textcomplete.register([{
      // Emoji strategy
      match: this.get('matcher'),
      search:  (term, callback) =>{
        this._search(term, callback,self);
    },
    replace: function (value) {
      return self.get('replaceFunction')(value);
    },
    template: function(value) {
      return self.get('templateFunction')(value);
    }
  }]);
  },
  willDestroyElement:function(){
    // Clean up
    this.get('textcomplete').destroy();
  }
});
