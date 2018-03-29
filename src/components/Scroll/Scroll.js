import * as React from 'react';

export class Scroll extends React.Component {

    state = {
        loading: false
    };

    constructor(props) {
        super(props);
        this.onScroll = this.onScroll.bind(this);
    }

    componentDidMount() {
        document.addEventListener('scroll', this.onScroll, {passive: true});
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.onScroll);
    }

    onScroll() {
        if (!this.props.Cols || this.state.loading) {
            return;
        }
    let win = window,
        doc = document,
        documentElement = doc.documentElement,
        body = doc.getElementsByTagName('body')[0],
        width = win.innerWidth || documentElement.clientWidth || body.clientWidth,
        height = win.innerHeight|| documentElement.clientHeight|| body.clientHeight;

        //для обычной сетки
        if (this.props.Cols > 0){
            let scrollTop = document.body.scrollTop || document.documentElement.scrollTop,
                windowHeight = window.innerHeight;
            console.log('up');
            if (scrollTop + windowHeight >= this.props.Coordinate) {
                this.nextPage();
            }
        }
        //для landscape
        if (this.props.Cols < 0){
            let scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft,
                windowWidth =  window.innerWidth;
            console.log('right');
            if(scrollLeft + windowWidth >= this.props.Coordinate){
                this.nextPage();
            }    
        }

    }

    async nextPage() {
        this.setState({loading: true});

        try {
            await this.props.FetchMore();
        } catch(err) {
            console.error(err);
        } finally {
            this.setState({loading: false});
        }
    }


    render() {
        return (
            <div className="scroll" ref={(container) => this.container = container}>
                {this.props.children}

                {this.state.loading && (
                        <div className="spinner"/>
                )}
            </div>
        );
    }

}