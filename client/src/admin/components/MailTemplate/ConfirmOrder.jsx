import React from 'react'

const ConfirmOrder = ({ orderItem }) => {
    console.log(orderItem)
    return (
        <div>
                 <meta charSet="utf-8" /> {/* utf-8 works for most cases */}
            <meta name="viewport" content="width=device-width" />{" "}
            {/* Forcing initial-scale shouldn't be necessary */}
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />{" "}
            {/* Use the latest (edge) version of IE rendering engine */}
            <meta name="x-apple-disable-message-reformatting" />{" "}
            {/* Disable auto-scale in iOS 10 Mail entirely */}
            <title />{" "}
            {/* The title tag shows in email notifications, like Android 4.4. */}
            <link
                href="https://fonts.googleapis.com/css?family=Work+Sans:200,300,400,500,600,700"
                rel="stylesheet"
            />
            {/* CSS Reset : BEGIN */}
            <style
                dangerouslySetInnerHTML={{
                    __html:
                        "\n\n        /* What it does: Remove spaces around the email design added by some email clients. */\n        /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */\n        html,\nbody {\n    margin: 0 auto !important;\n    padding: 0 !important;\n    height: 100% !important;\n    width: 100% !important;\n    background: #f1f1f1;\n}\n\n/* What it does: Stops email clients resizing small text. */\n* {\n    -ms-text-size-adjust: 100%;\n    -webkit-text-size-adjust: 100%;\n}\n\n/* What it does: Centers email on Android 4.4 */\ndiv[style*=\"margin: 16px 0\"] {\n    margin: 0 !important;\n}\n\n/* What it does: Stops Outlook from adding extra spacing to tables. */\ntable,\ntd {\n    mso-table-lspace: 0pt !important;\n    mso-table-rspace: 0pt !important;\n}\n\n/* What it does: Fixes webkit padding issue. */\ntable {\n    border-spacing: 0 !important;\n    border-collapse: collapse !important;\n    table-layout: fixed !important;\n    margin: 0 auto !important;\n}\n\n/* What it does: Uses a better rendering method when resizing images in IE. */\nimg {\n    -ms-interpolation-mode:bicubic;\n}\n\n/* What it does: Prevents Windows 10 Mail from underlining links despite inline CSS. Styles for underlined links should be inline. */\na {\n    text-decoration: none;\n}\n\n/* What it does: A work-around for email clients meddling in triggered links. */\n*[x-apple-data-detectors],  /* iOS */\n.unstyle-auto-detected-links *,\n.aBn {\n    border-bottom: 0 !important;\n    cursor: default !important;\n    color: inherit !important;\n    text-decoration: none !important;\n    font-size: inherit !important;\n    font-family: inherit !important;\n    font-weight: inherit !important;\n    line-height: inherit !important;\n}\n\n/* What it does: Prevents Gmail from displaying a download button on large, non-linked images. */\n.a6S {\n    display: none !important;\n    opacity: 0.01 !important;\n}\n\n/* What it does: Prevents Gmail from changing the text color in conversation threads. */\n.im {\n    color: inherit !important;\n}\n\n/* If the above doesn't work, add a .g-img class to any image in question. */\nimg.g-img + div {\n    display: none !important;\n}\n\n/* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */\n/* Create one of these media queries for each additional viewport size you'd like to fix */\n\n/* iPhone 4, 4S, 5, 5S, 5C, and 5SE */\n@media only screen and (min-device-width: 320px) and (max-device-width: 374px) {\n    u ~ div .email-container {\n        min-width: 320px !important;\n    }\n}\n/* iPhone 6, 6S, 7, 8, and X */\n@media only screen and (min-device-width: 375px) and (max-device-width: 413px) {\n    u ~ div .email-container {\n        min-width: 375px !important;\n    }\n}\n/* iPhone 6+, 7+, and 8+ */\n@media only screen and (min-device-width: 414px) {\n    u ~ div .email-container {\n        min-width: 414px !important;\n    }\n}\n    "
                }}
            />
            {/* CSS Reset : END */}
            {/* Progressive Enhancements : BEGIN */}
            <style
                dangerouslySetInnerHTML={{
                    __html:
                        "\n\n\t    .primary{\n\tbackground: #17bebb;\n}\n.bg_white{\n\tbackground: #ffffff;\n}\n.bg_light{\n\tbackground: #f7fafa;\n}\n.bg_black{\n\tbackground: #000000;\n}\n.bg_dark{\n\tbackground: rgba(0,0,0,.8);\n}\n.email-section{\n\tpadding:2.5em;\n}\n\n/*BUTTON*/\n.btn{\n\tpadding: 10px 15px;\n\tdisplay: inline-block;\n}\n.btn.btn-primary{\n\tborder-radius: 5px;\n\tbackground: #17bebb;\n\tcolor: #ffffff;\n}\n.btn.btn-white{\n\tborder-radius: 5px;\n\tbackground: #ffffff;\n\tcolor: #000000;\n}\n.btn.btn-white-outline{\n\tborder-radius: 5px;\n\tbackground: transparent;\n\tborder: 1px solid #fff;\n\tcolor: #fff;\n}\n.btn.btn-black-outline{\n\tborder-radius: 0px;\n\tbackground: transparent;\n\tborder: 2px solid #000;\n\tcolor: #000;\n\tfont-weight: 700;\n}\n.btn-custom{\n\tcolor: rgba(0,0,0,.3);\n\ttext-decoration: underline;\n}\n\nh1,h2,h3,h4,h5,h6{\n\tfont-family: 'Work Sans', sans-serif;\n\tcolor: #000000;\n\tmargin-top: 0;\n\tfont-weight: 400;\n}\n\nbody{\n\tfont-family: 'Work Sans', sans-serif;\n\tfont-weight: 400;\n\tfont-size: 15px;\n\tline-height: 1.8;\n\tcolor: rgba(0,0,0,.4);\n}\n\na{\n\tcolor: #17bebb;\n}\n\ntable{\n}\n/*LOGO*/\n\n.logo h1{\n\tmargin: 0;\n}\n.logo h1 a{\n\tcolor: #17bebb;\n\tfont-size: 24px;\n\tfont-weight: 700;\n\tfont-family: 'Work Sans', sans-serif;\n}\n\n/*HERO*/\n.hero{\n\tposition: relative;\n\tz-index: 0;\n}\n\n.hero .text{\n\tcolor: rgba(0,0,0,.3);\n}\n.hero .text h2{\n\tcolor: #000;\n\tfont-size: 34px;\n\tmargin-bottom: 15px;\n\tfont-weight: 300;\n\tline-height: 1.2;\n}\n.hero .text h3{\n\tfont-size: 24px;\n\tfont-weight: 200;\n}\n.hero .text h2 span{\n\tfont-weight: 600;\n\tcolor: #000;\n}\n\n\n/*PRODUCT*/\n.product-entry{\n\tdisplay: block;\n\tposition: relative;\n\tfloat: left;\n\tpadding-top: 20px;\n}\n.product-entry .text{\n\twidth: calc(100% - 125px);\n\tpadding-left: 20px;\n}\n.product-entry .text h3{\n\tmargin-bottom: 0;\n\tpadding-bottom: 0;\n}\n.product-entry .text p{\n\tmargin-top: 0;\n}\n.product-entry img, .product-entry .text{\n\tfloat: left;\n}\n\nul.social{\n\tpadding: 0;\n}\nul.social li{\n\tdisplay: inline-block;\n\tmargin-right: 10px;\n}\n\n/*FOOTER*/\n\n.footer{\n\tborder-top: 1px solid rgba(0,0,0,.05);\n\tcolor: rgba(0,0,0,.5);\n}\n.footer .heading{\n\tcolor: #000;\n\tfont-size: 20px;\n}\n.footer ul{\n\tmargin: 0;\n\tpadding: 0;\n}\n.footer ul li{\n\tlist-style: none;\n\tmargin-bottom: 10px;\n}\n.footer ul li a{\n\tcolor: rgba(0,0,0,1);\n}\n\n\n@media screen and (max-width: 500px) {\n\n\n}\n\n\n    "
                }}
            />
            <center style={{ width: "100%", backgroundColor: "#f1f1f1" }}>
                <div
                    style={{
                        display: "none",
                        fontSize: 1,
                        maxHeight: 0,
                        maxWidth: 0,
                        opacity: 0,
                        overflow: "hidden",
                        msoHide: "all",
                        fontFamily: "sans-serif"
                    }}
                >
                    ‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;
                </div>
                <div
                    style={{ maxWidth: 600, margin: "0 auto" }}
                    className="email-container"
                >
                    {/* BEGIN BODY */}
                    <table
                        align="center"
                        role="presentation"
                        cellSpacing={0}
                        cellPadding={0}
                        border={0}
                        width="100%"
                        style={{ margin: "auto" }}
                    >
                        <tbody>
                            <tr>
                                <td
                                    valign="top"
                                    className="bg_white"
                                    style={{ padding: "1em 2.5em 0 2.5em" }}
                                >
                                    <table
                                        role="presentation"
                                        border={0}
                                        cellPadding={0}
                                        cellSpacing={0}
                                        width="100%"
                                    >
                                        <tbody>
                                            <tr>
                                                <td className="logo" style={{ textAlign: "left" }}>
                                                    <h1>
                                                        <a className=' font-Pacifico' href="#">KATCH SHOP</a>
                                                    </h1>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            {/* end tr */}
                            <tr>
                                <td
                                    valign="middle"
                                    className="hero bg_white"
                                    style={{ padding: "2em 0 2em 0" }}
                                >
                                    <table
                                        role="presentation"
                                        border={0}
                                        cellPadding={0}
                                        cellSpacing={0}
                                        width="100%"
                                    >
                                        <tbody>
                                            <tr>
                                                <td style={{ padding: "0 2.5em", textAlign: "left" }}>
                                                    <div className="text">
                                                        <h2>This is your order</h2>
                                                        <h3>
                                                            Amazing deals, updates, interesting news right in your
                                                            inbox
                                                        </h3>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            {/* end tr */}
                            <tr></tr>
                        </tbody>
                    </table>
                    <table
                        className="bg_white"
                        role="presentation"
                        border={0}
                        cellPadding={0}
                        cellSpacing={0}
                        width="100%"
                    >
                        <tbody>
                            <tr style={{ borderBottom: "1px solid rgba(0,0,0,.05)" }}>
                                <th
                                    width="80%"
                                    style={{
                                        textAlign: "left",
                                        padding: "0 2.5em",
                                        color: "#000",
                                        paddingBottom: 20
                                    }}
                                >
                                    Item
                                </th>
                                <th
                                    width="20%"
                                    style={{
                                        textAlign: "right",
                                        padding: "0 2.5em",
                                        color: "#000",
                                        paddingBottom: 20
                                    }}
                                >
                                    Price
                                </th>
                            </tr>
                            {orderItem && orderItem.map((item) => {
                                return (

                                    <tr style={{ borderBottom: "1px solid rgba(0,0,0,.05)" }}>
                                        <td
                                            valign="middle"
                                            width="80%"
                                            style={{ textAlign: "left", padding: "0 2.5em" }}
                                        >
                                            <div className="product-entry">
                                                <img
                                                    src="images/prod-1.jpg"
                                                    alt=""
                                                    style={{
                                                        width: 100,
                                                        maxWidth: 600,
                                                        height: "auto",
                                                        marginBottom: 20,
                                                        display: "block"
                                                    }}
                                                />
                                                <div className="text">
                                                    <h3>{item.product.name_prd}</h3>
                                                    <span>{item.product.brand.name_brand}</span>
                                                    <p>
                                                        {}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td
                                            valign="middle"
                                            width="20%"
                                            style={{ textAlign: "left", padding: "0 2.5em" }}
                                        >
                                            <span className="price" style={{ color: "#000", fontSize: 20 }}>
                                                ${item.product.price_prd.toLocaleString()}
                                            </span>
                                        </td>
                                    </tr>
                                )
                            })}
                            <tr>
                                <td
                                    valign="middle"
                                    style={{ textAlign: "left", padding: "1em 2.5em" }}
                                >
                                    <p>
                                        <a href="#" className="btn btn-primary">
                                            Continue to your order
                                        </a>
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table
                        align="center"
                        role="presentation"
                        cellSpacing={0}
                        cellPadding={0}
                        border={0}
                        width="100%"
                        style={{ margin: "auto" }}
                    >
                        <tbody>
                            <tr>
                                <td valign="middle" className="bg_light footer email-section">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td valign="top" width="33.333%" style={{ paddingTop: 20 }}>
                                                    <table
                                                        role="presentation"
                                                        cellSpacing={0}
                                                        cellPadding={0}
                                                        border={0}
                                                        width="100%"
                                                    >
                                                        <tbody>
                                                            <tr>
                                                                <td style={{ textAlign: "left", paddingRight: 10 }}>
                                                                    <h3 className="heading">About</h3>
                                                                    <p>
                                                                       KATCHSHOP
                                                                    </p>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                                <td valign="top" width="33.333%" style={{ paddingTop: 20 }}>
                                                    <table
                                                        role="presentation"
                                                        cellSpacing={0}
                                                        cellPadding={0}
                                                        border={0}
                                                        width="100%"
                                                    >
                                                        <tbody>
                                                            <tr>
                                                                <td
                                                                    style={{
                                                                        textAlign: "left",
                                                                        paddingLeft: 5,
                                                                        paddingRight: 5
                                                                    }}
                                                                >
                                                                    <h3 className="heading">Contact Info</h3>
                                                                    <ul>
                                                                        <li>
                                                                            <span className="text">
                                                                                Ninh Kieu-Can Tho
                                                                            </span>
                                                                        </li>
                                                                        <li>
                                                                            <span className="text">+84 83 6420 652</span>
                                                                        </li>
                                                                    </ul>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                                <td valign="top" width="33.333%" style={{ paddingTop: 20 }}>
                                                    <table
                                                        role="presentation"
                                                        cellSpacing={0}
                                                        cellPadding={0}
                                                        border={0}
                                                        width="100%"
                                                    >
                                                        <tbody>
                                                            <tr>
                                                                <td style={{ textAlign: "left", paddingLeft: 10 }}>
                                                                    <h3 className="heading">Useful Links</h3>
                                                                    <ul>
                                                                        <li>
                                                                            <a href="#">Home</a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="#">Account</a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="#">Wishlist</a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="#">Order</a>
                                                                        </li>
                                                                    </ul>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            {/* end: tr */}
                            <tr>
                                <td className="bg_white" style={{ textAlign: "center" }}>
                                    <p>
                                        No longer want to receive these email? You can{" "}
                                        <a href="#" style={{ color: "rgba(0,0,0,.8)" }}>
                                            Unsubscribe here
                                        </a>
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </center>
        </div>
    )
}

export default ConfirmOrder