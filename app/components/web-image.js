var WebImage = Ember.Component.extend({
    tagName: 'div',
    classNames: ['card-web-image'],
    attributeBindings: ['style'],
    style: function(){
        var s = 'width:' + this.get('width') + 'px; height:' + this.get('height') + 'px;' + 'background-image:url(' + this.get('url') + ');';
        if (this.get('url.length')) s += 'background-color:transparent;';
        return s;
    }.property('width', 'height', 'url'),
    width: 50,
    height: 50,
});

export default WebImage;