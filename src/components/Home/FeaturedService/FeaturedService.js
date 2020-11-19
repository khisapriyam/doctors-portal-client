import React from 'react';
import Featuredimg from '../../../images/Featuredimg.png'

const FeaturedService = () => {
    return (
        <section className="features-service pb-0 pb-md-5 my-5">
            <div className="container mb-5">
                <div className="row mb-5">
                    <div className="col-md-5 mb-4 m-md-0">
                        <img className="img-fluid" src={Featuredimg} alt=""/>
                    </div>
                    <div className="col-md-7 align-self-center">
                        <h1>Exceptional Dental <br/>Care, on Your Terms</h1>
                        <p className="text-secondary">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed eius, molestias totam labore repellendus dolorem tempora fuga dolor minus veniam quae laborum fugiat iste minima eaque pariatur illum, veritatis, neque recusandae? Hic maiores provident facilis illo cum neque error cumque nihil necessitatibus, explicabo commodi quaerat odit! Nostrum numquam saepe dignissimos assumenda accusamus nisi itaque distinctio nesciunt voluptatibus facere, id, dolores fugiat non doloribus eveniet porro! Blanditiis fugit magni et eius autem explicabo rem totam, nostrum sed vel quas quia repellat at tempora quidem saepe, provident ut commodi similique quod obcaecati veniam? Iste non tempora obcaecati sit error vitae aut voluptatem!</p>
                        <button className="btn btn-primary">Learn More</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedService;