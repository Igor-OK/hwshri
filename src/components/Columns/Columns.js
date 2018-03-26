import * as React from 'react';

// import {Grid} from '../Grid/Grid';

export class Columns extends React.Component {
    state = {
        width: 0,
        height: 0,
        columns: 0,
        columnWidth: 0
    };


    constructor(props) {
        super(props);
        this.updateDimensions = this.updateDimensions.bind(this);
    }


    componentWillMount() {
        this.updateDimensions();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }

    updateDimensions(){
        let win = window,
            doc = document,
            documentElement = doc.documentElement,
            body = doc.getElementsByTagName('body')[0],
            width = win.innerWidth || documentElement.clientWidth || body.clientWidth,
            height = win.innerHeight|| documentElement.clientHeight|| body.clientHeight,
            cols,
            colWidth;
        if (width >= 1300) cols = 4;
        if (width < 1300 && width >= 950) cols = 3;
        if (width < 950 && width >= 640) cols = 2;
        if (width < 640 ) cols = 1;
        colWidth = Math.round(width/cols);

        this.setState({width: width, height: height, columns: cols, columnWidth: colWidth });
    }


    render() {
        let width = this.state.columnWidth;
        // console.log(width);

        return (
            <div className="grid">
            {
                this.props.Items.map(card=>
                <div  key={card._id} >
                    <img                        
                        src={card.thumbnail} 
                        style={{
                            width: width +'px',
                            }}
                    />
                </div>    
                )
            }
            </div>
        );

        // return (
        //     <Grid Items={this.props.Items} Cols={this.state.columns} ColWidth={this.state.columnWidth} />
        // );

    }




}

