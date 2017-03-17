import React, {
    Component
} from 'React';
import {
    View,
    Image,
} from 'react-native';

export default class FitImage extends Component {
    constructor(props) {
        super(props);

        this.dHeight = undefined;
        this.dWidth = undefined;

        this.state = {
            height: 0,
            width: 0,
            showImage: false
        }
    }

    render() {
        return (
            <View onLayout={({nativeEvent: {layout: {x, y, width, height}}})=>{
                if (width > 0) {
                    this.dWidth = width;
                }
                if (height > 0) {
                    this.dHeight = height;
                }
                Image.getSize(this.props.source.uri, (w, h) => {
                    if (this.dWidth != undefined && this.dHeight != undefined) {
                        var dh = this.dHeight;
                        var dw = this.dWidth;
                    }else if (this.dWidth != undefined) {
                        var dw = this.dWidth;
                        var dh = h / (w / dw);
                    }else if (this.dHeight != undefined) {
                        var dh = this.dHeight;
                        var dw = w / (h / dh);
                    }
                    this.setState({
                        height: dh,
                        width: dw,
                        showImage: true
                    })
                });
            }} style={[this.props.style, {justifyContent: 'center', alignItems: 'center', overflow: 'hidden'}]}>
                <Image source = {
                    this.props.source
                }
                style = {{
                    height: this.state.height,
                    width: this.state.width
                }}/>
            </View>
        );
    }
}
