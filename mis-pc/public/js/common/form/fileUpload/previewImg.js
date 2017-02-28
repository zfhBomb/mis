define(function(require, exports, module) {
    var errorMixin=require('./errorMixin.js');

    function get_thumbnail(img,w,h,type){
        var dataURL
        try {
            var canvas = document.createElement('canvas');
            canvas.width = w; canvas.height = h;
            var context = canvas.getContext('2d');
            context.drawImage(img, 0, 0, img.width, img.height, 0, 0, w, h);
            dataURL = canvas.toDataURL(/*type == 'image/jpeg' ? type : 'image/png', 10*/);
        } catch(e) {
            dataURL = null;
        }

        //there was only one image that failed in firefox completely randomly! so let's double check it
        if(!( /^data\:image\/(png|jpe?g|gif);base64,[0-9A-Za-z\+\/\=]+$/.test(dataURL)) ) dataURL = null;
        if(! dataURL) return null;

        return {src: dataURL, w:w, h:h};
    }


    var PreviewImage=React.createClass({
        mixins:[errorMixin],
        getInitialState:function(){
            return {
                completeDraw:false
            }
        },

        drawImage:function(file){
            this.setState({
                completeDraw:false
            });
            var drawFuc=function(){
                var deferred = new $.Deferred
                var reader = new FileReader();
                var img=$(this.refs.img);
                reader.onload = function (e) {
                    img.one('load',function(){
                        this.thumb =get_thumbnail(img.get(0),this.props.width,this.props.height);
                        if(this.thumb == null) {
                            //if making thumbnail fails
                            deferred.reject({code:this.error.thumbnailFailed});
                            this.props.errorHandler(this.error.thumbnailFailed);
                            return;
                        }
                        deferred.resolve();
                    }.bind(this));
                    img.one('error',function(){
                        deferred.reject({code:this.error.imageLoadFailed});
                        this.props.errorHandler(this.error.imageLoadFailed);
                    }.bind(this));


                    img.get(0).src = e.target.result;

                }.bind(this);
                reader.onerror = function (e) {
                    deferred.reject({code: this.error.fileLoadFailed});
                    this.props.errorHandler(this.error.fileLoadFailed);
                }.bind(this);
                reader.readAsDataURL(file);
                return deferred.promise();
            };

            $.when(drawFuc.call(this)).done(function(){
                this.setState({
                    completeDraw:true
                });
            }.bind(this)).fail(function(result){
                //called on failure to load preview

            });
        },


        render:function(){
            var style={
                display:'none'
            };
            if(this.state.completeDraw){
                style={
                    display:'block',
                    backgroundImage:'url('+this.thumb.src+')',
                    width:this.props.width-4+'px',
                    height:this.props.height-4+'px'
                }
            }

            return (
                <img ref="img" className='middle' style={style} src={this.props.value}/>
            )
        }
    });
    module.exports=PreviewImage;
});