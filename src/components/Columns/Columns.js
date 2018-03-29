import * as React from 'react';

 import {Grid} from '../Grid/Grid';

export class Columns extends React.Component {
    state = {
        newArray:[],
        width: 0,
        height: 0,
        columns: 0,
        columnWidth: 0,
        coordinate:0
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

    componentWillReceiveProps(){
        this.updateDimensions();
    }

    updateDimensions(){
        let win = window,
            doc = document,
            documentElement = doc.documentElement,
            body = doc.getElementsByTagName('body')[0],
            width = win.innerWidth || documentElement.clientWidth || body.clientWidth,
            height = win.innerHeight|| documentElement.clientHeight|| body.clientHeight,
            cols,
            colWidth,
            verticalCoords,
            number,
            horisontalCoords = 0;
console.log('width-', width, '  height-', height);
// Сейчас я вычислю размеры и координаты для всех элементов с картинками и передам их дальше
// Дабы не изменять первоначальный массив данных добавлением в него новых полей, создадим клон и дальше будем работать с ним
// А вообще, изменение ли это, когда все остается без изменений, но добавляются новые ключ-значения?(вдумчиво смотрю вдаль)
        function DeepCopy (H){
            if(Array.isArray(H)){
                var mas = [];
                for (var i=0; i<H.length; i++)
                    mas[i]=DeepCopy (H[i]);
                return mas;
            }
            if((typeof H) === 'object'){
                var Hnew={};
                for (var k in H)
                    Hnew[k]=DeepCopy(H[k]);     
                return Hnew;
            }
            return H;
        };    
        let array = DeepCopy(this.props.Items);
        
        Определяем размеры-ориентацию устройства
        if (width >= 1300){
            cols = 4;
            verticalCoords=[0, 0, 0, 0];
        } 
        if (width < 1300 && width >= 950){
            cols = 3;
            verticalCoords=[0, 0, 0];
        } 
        if (width < 950 && width >= 640){
            cols = 2;
            verticalCoords=[0, 0];
        } 
        if (width < 640){
            cols = 1;
            verticalCoords=[0];
        } 
        if ( (height< 480) && (/Android|webOS|iPhone|iPod|BlackBerry|BB|IEMobile|Windows Phone|Opera Mini/i.test(navigator.userAgent)) ) {
            console.warn('mobile');
            cols = -1;
            verticalCoords=[0];
            console.log('gogogo');
        }
        //ширина колонки если не landscape
        colWidth = Math.round(width/cols); 

        // считаем всю геометрию для всех сеток
        if (cols > 0 ){
            for( let i=0; i<array.length; i++){
                //Вычисляем высоту и ширину компонента с картинкой при нашей ширине колонке
                let th = array[i].thumb_height;
                let tw = array[i].thumb_width;
                array[i].elem_height = Math.ceil(th * colWidth/tw);
                array[i].elem_width = colWidth; 
                //Очень хочется, чтобы порядок расположения картинок соответствовал координатам top
                //(чем раньше картинка в массиве, тем выше она на странице, или левее)
                //посему определяем номер самой короткой колонки
                number = verticalCoords.indexOf(Math.min.apply(Math, verticalCoords)) ; 
                //получаем абсолютные координаты элемента
                array[i].elem_top =  verticalCoords[number]; //задаем абсолютные координаты элемента
                array[i].elem_left = number * colWidth;
                //добавляем высоту элемента к нашим высотам (обновляем меньшую длину сформированных колонок макета)
                verticalCoords[number] += array[i].elem_height; 
            }
            this.setState({
                width: width, 
                height: height, 
                columns: cols, 
                columnWidth: colWidth, 
                newArray: array, 
                coordinate: Math.min.apply(Math, verticalCoords)
            });
        }

        // считаем геометрию для landscape
        if (cols < 0 ){
            console.log('string');
            for(let i=0; i<array.length; i++){
                // определяем размеры компонента-картинки
                let th = array[i].thumb_height;
                let tw = array[i].thumb_width;
                array[i].elem_width = Math.ceil(tw * height / th);
                array[i].elem_height = height;
                // абсолютные координаты элемента
                array[i].elem_top = 0;
                array[i].elem_left = horisontalCoords;
                //обновляем горизонтальную координату для следующего элемента
                horisontalCoords += array[i].elem_width;
            }
            this.setState({
                width: width, 
                height: height, 
                columns: cols, 
                newArray: array, 
                coordinate: horisontalCoords
            });
        }
    }


    render() {
        return (
                <Grid 
                    Items = {this.state.newArray} 
                    Cols={this.state.columns} 
                    Coordinate={this.state.coordinate} 
                    FetchMore={this.props.FetchMore}
                />
        );
    }

}

