import React from "react";

const Newsletter = () => {
    return (
        <div className="newsletterWrapper border-bottom-divider py-5 px-2 col-12 col-md-8 m-auto">
            <p className="text-white py-3">Vuoi sapere quando verranno aggiunti nuovi cocktail? Inserisci la tua email e verrai contattato.</p>
            <form className="form-inline d-sm-flex">
                <div className="form-group mb-2 col-12 col-sm-8 pe-sm-3">
                    <input
                        type="text"
                        className="form-control-plaintext"
                        id="staticEmail2"
                        placeholder="Email"
                    />
                </div>

                <button type="submit" className="btn btn-primary mb-2 col-12 col-sm-4">
                    Invia
                </button>
            </form>
        </div>

    );
};

export default Newsletter;
