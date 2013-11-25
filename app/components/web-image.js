var WebImage = Ember.Component.extend({
    tagName: 'img',
    classNames: ['card-web-image'],
    attributeBindings: ['src', 'style'],
    src: function(){
        return this.get('url');
    }.property('url'),
    style: function(){
        return 'width:' + this.get('width') + 'px; height:' + this.get('height') + 'px;';
    }.property('width', 'height'),
    width: 50,
    height: 50,
});

export default WebImage;