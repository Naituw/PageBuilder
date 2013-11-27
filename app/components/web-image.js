var WebImage = Ember.Component.extend({
    tagName: 'div',
    classNames: ['card-web-image'],
    attributeBindings: ['style'],
    style: function(){
        return 'width:' + this.get('width') + 'px; height:' + this.get('height') + 'px;' + 'background-image:url(' + this.get('url') + ')';
    }.property('width', 'height', 'url'),
    width: 50,
    height: 50,
});

export default WebImage;