/**
 * This file will hold the Menu that lives at the top of the Page, this is all rendered using a React Component...
 * 
 */
import React from 'react';

class Menu extends React.Component {

    /**
     * Main constructor for the Menu Class
     * @memberof Menu
     */
    constructor() {
        super();
        this.state = {
            showingSearch: false,
            products: []
        };
    }

    /**
     * Shows or hides the search container
     * @memberof Menu
     * @param e [Object] - the event from a click handler
     */
    showSearchContainer(e) {
        e.preventDefault();
        this.setState({
            showingSearch: !this.state.showingSearch
        });
    }

    /**
     * Calls upon search change
     * @memberof Menu
     * @param e [Object] - the event from a text change handler
     */
    async onSearch(e) {
        // console.log('e',e.target.value)
        // Start Here
        // ...
        if (e?.target?.value) {
            const searchBy = e?.target?.value
            if(searchBy.length >=4 ){
                try {
                    const response = await fetch("http://localhost:3035/product?searchBy=" + searchBy
                    ).then((response) => response.json()); 
                    response && this.setState({ products: response })
                } catch (error) {
                    // this.setState({ products: response })
                    console.log(error)
                }
               
            }
           
        }

    }
    /**
     * Renders the default app in the window, we have assigned this to an element called root.
     * 
     * @returns JSX
     * @memberof App
    */
    render() {
        return (
            <header className="menu">
                <div className="menu-container">
                    <div className="menu-holder">
                        <h1>ELC</h1>
                        <nav>
                            <a href="#" className="nav-item">HOLIDAY</a>
                            <a href="#" className="nav-item">WHAT'S NEW</a>
                            <a href="#" className="nav-item">PRODUCTS</a>
                            <a href="#" className="nav-item">BESTSELLERS</a>
                            <a href="#" className="nav-item">GOODBYES</a>
                            <a href="#" className="nav-item">STORES</a>
                            <a href="#" className="nav-item">INSPIRATION</a>

                            <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                                <i className="material-icons search">search</i>
                            </a>
                        </nav>
                    </div>
                </div>
                <div className={(this.state.showingSearch ? "showing " : "") + "search-container"}>
                    <input type="text" onChange={(e) => this.onSearch(e)} />
                    <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                        <i className="material-icons close">close</i>
                    </a>
                    <br />
                    <div className="list-product-container">
                        {this.state.products && this.state.products.map((product, ind) => {
                            return (<>
                                <div class="list-product-container-item" data-product-id={product._id} >
                                    <div class="image-box">
                                        <img class="images" src={window.location.origin + product.picture} alt="No Image" />

                                    </div>
                                    <div class="text-box">
                                        <h2 class="item"> {product.name || "NA"}</h2> 
                                        {/* <h4 class="item"> {product.about || "NA"}</h4>  */}
                                    </div>
                                </div>
                            </>)
                        })}
                    </div>
                    {/* <div class="" data-product-id="PROD111419" >
                        <a href=" ampoo-mascara-refresher" class="header-search__result__image">
                            <img class="  lazyloaded" data-src=" x1_0.png?width=320&amp;height=320" alt="" />
                        </a>
                        <div class="header-search__result__body">
                            <a class="header-search__result__link" href=" a/lash-dry-shampoo-mascara-refresher">
                                Lash Dry Shampoo Mascara Refresher</a>
                        </div>
                    </div> */}

                </div>
            </header>
        );
    }


}

// Export out the React Component
export default Menu;