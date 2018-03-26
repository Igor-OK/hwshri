import * as React from 'react';

// import {Grid} from '../Grid/Grid';

export class Columns extends React.Component {
    state = {
        newArray:[],
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
        let array = this.props.Items.slice(); // тут нужно глубоко скопировать

        // var oldArray = ["a", "b", "c"];
        // var newArray = oldArray.slice();

        if (width >= 1300) cols = 4;
        if (width < 1300 && width >= 950) cols = 3;
        if (width < 950 && width >= 640) cols = 2;
        if (width < 640 ) cols = 1;
        colWidth = Math.round(width/cols);
        let verticalCoords = [0,0,0,0]; // формируем массив исходя из количества cols    !

        for( let i=0; i< array.length; i++){
            let th = array[i].thumb_height;
            let tw = array[i].thumb_width;
            let page_height = th*colWidth/tw; // фактическая высота блока на странице
            array[i].page_height = Math.ceil(page_height);// текущая высота элемента

            let number = verticalCoords.indexOf(Math.min.apply(Math, verticalCoords)) ; //определяем номер колонки с самой короткой колонкой
            array[i].page_top =  Math.ceil(verticalCoords[number]); //задаем абсолютные координаты элемента
            array[i].page_left = number*colWidth;

            verticalCoords[number] += array[i].page_height; //добавляем туда текущую высоту

            console.log(verticalCoords);

        }
        console.log(array);

        this.setState({width: width, height: height, columns: cols, columnWidth: colWidth, newArray: array});

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
                            position: 'absolute',
                            width: width +'px',
                            top: card.page_top +'px',
                            left: card.page_left +'px'
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

