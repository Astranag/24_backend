const year = new Date().getFullYear();
const EmailTemplate = ({ name, message }) => `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!--<![endif]-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title></title>
    <style type="text/css">
      * {
      	-webkit-font-smoothing: antialiased;
      }
      body {
      	Margin: 0;
      	padding: 0;
      	min-width: 100%;
      	font-family: Arial, sans-serif;
      	-webkit-font-smoothing: antialiased;
      }
      table {
      	border-spacing: 0;
      	color: #333333;
      	font-family: Arial, sans-serif;
      }
      img {
      	border: 0;
      }
      .wrapper {
      	width: 100%;
      	table-layout: fixed;
      	-webkit-text-size-adjust: 100%;
      	-ms-text-size-adjust: 100%;
      }
      .webkit {
      	max-width: 600px;
      }
      .outer {
      	Margin: 0 auto;
      	width: 100%;
      	max-width: 600px;
      }
      .full-width-image img {
      	width: 100%;
      	max-width: 600px;
      	height: auto;
      }
      .inner {
      	padding: 10px;
      }
      p {
      	Margin: 0;
      	padding-bottom: 10px;
      }
      .h1 {
      	font-size: 21px;
      	font-weight: bold;
      	Margin-top: 15px;
      	Margin-bottom: 5px;
      	font-family: Arial, sans-serif;
      	-webkit-font-smoothing: antialiased;
      }
      .h2 {
      	font-size: 18px;
      	font-weight: bold;
      	Margin-top: 10px;
      	Margin-bottom: 5px;
      	font-family: Arial, sans-serif;
      	-webkit-font-smoothing: antialiased;
      }
      .one-column .contents {
      	text-align: left;
      	font-family: Arial, sans-serif;
      	-webkit-font-smoothing: antialiased;
      }
      .one-column p {
      	font-size: 14px;
      	Margin-bottom: 10px;
      	font-family: Arial, sans-serif;
      	-webkit-font-smoothing: antialiased;
      }
      .two-column {
      	text-align: center;
      	font-size: 0;
      }
      .two-column .column {
      	width: 100%;
      	max-width: 300px;
      	display: inline-block;
      	vertical-align: top;
      }
      .contents {
      	width: 100%;
      }
      .two-column .contents {
      	font-size: 14px;
      	text-align: left;
      }
      .two-column img {
      	width: 100%;
      	max-width: 280px;
      	height: auto;
      }
      .two-column .text {
      	padding-top: 10px;
      }
      .three-column {
      	text-align: center;
      	font-size: 0;
      	padding-top: 10px;
      	padding-bottom: 10px;
      }
      .three-column .column {
      	width: 100%;
      	max-width: 200px;
      	display: inline-block;
      	vertical-align: top;
      }
      .three-column .contents {
      	font-size: 14px;
      	text-align: center;
      }
      .three-column img {
      	width: 100%;
      	max-width: 180px;
      	height: auto;
      }
      .three-column .text {
      	padding-top: 10px;
      }
      .img-align-vertical img {
      	display: inline-block;
      	vertical-align: middle;
      }
      @media only screen and (max-device-width: 480px) {
      table[class=hide], img[class=hide], td[class=hide] {
      	display: none !important;
      }
    </style>
    <!--[if (gte mso 9)|(IE)]>
      <style type="text/css">
        table {
          border-collapse: collapse !important;
        }
      </style>
    <![endif]-->
  </head>

  <body
    style="
      margin: 0;
      padding-top: 0;
      padding-bottom: 0;
      padding-right: 0;
      padding-left: 0;
      min-width: 100%;
      background-color: #ececec;
    "
  >
    <center
      class="wrapper"
      style="
        width: 100%;
        table-layout: fixed;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
        background-color: #ececec;
      "
    >
      <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        border="0"
        style="background-color: #ececec"
        bgcolor="#ececec;"
      >
        <tr>
          <td width="100%">
            <div class="webkit" style="max-width: 600px; margin: 0 auto">
              <!--[if (gte mso 9)|(IE)]>

						<table width="600" align="center" cellpadding="0" cellspacing="0" border="0" style="border-spacing:0" >
							<tr>
								<td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;" >
								<![endif]-->

              <!-- ======= start main body ======= -->
              <table
                class="outer"
                align="center"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="
                  border-spacing: 0;
                  margin: 0 auto;
                  width: 100%;
                  max-width: 600px;
                "
              >
                <tr>
                  <td
                    style="
                      padding-top: 0;
                      padding-bottom: 0;
                      padding-right: 0;
                      padding-left: 0;
                    "
                  >
                    <!-- ======= start header ======= -->

                    <table
                      border="0"
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                    >
                      <tr>
                        <td>
                          <table
                            style="width: 100%"
                            cellpadding="0"
                            cellspacing="0"
                            border="0"
                          >
                            <tbody>
                              <tr>
                                <td align="center">
                                  <center>
                                    <table
                                      border="0"
                                      align="center"
                                      width="100%"
                                      cellpadding="0"
                                      cellspacing="0"
                                      style="margin: 0 auto"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            class="one-column"
                                            style="
                                              padding-top: 0;
                                              padding-bottom: 0;
                                              padding-right: 0;
                                              padding-left: 0;
                                            "
                                          >
                                            <table
                                              border="0"
                                              cellpadding="0"
                                              cellspacing="0"
                                              width="100%"
                                              style="border-spacing: 0"
                                            >
                                              <tr>
                                                <td>&nbsp;</td>
                                              </tr>
                                              <tr>
                                                <td align="center">&nbsp;</td>
                                              </tr>
                                              <tr>
                                                <td
                                                  height="6"
                                                  bgcolor="#E16A2E"
                                                  class="contents"
                                                  style="
                                                    width: 100%;
                                                    border-top-left-radius: 10px;
                                                    border-top-right-radius: 10px;
                                                  "
                                                ></td>
                                              </tr>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </center>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </table>
                    <table
                      border="0"
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                    >
                      <tr>
                        <td>
                          <table
                            style="width: 100%"
                            cellpadding="0"
                            cellspacing="0"
                            border="0"
                          >
                            <tbody>
                              <tr>
                                <td align="center">
                                  <center>
                                    <table
                                      border="0"
                                      align="center"
                                      width="100%"
                                      cellpadding="0"
                                      cellspacing="0"
                                      style="margin: 0 auto"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            class="one-column"
                                            style="
                                              padding-top: 0;
                                              padding-bottom: 0;
                                              padding-right: 0;
                                              padding-left: 0;
                                            "
                                            bgcolor="#FFFFFF"
                                          >
                                            <!-- ======= start header ======= -->

                                            <table
                                              cellpadding="0"
                                              cellspacing="0"
                                              border="0"
                                              width="100%"
                                            >
                                              <tr>
                                                <td
                                                  class="two-column"
                                                  style="
                                                    padding-top: 0;
                                                    padding-bottom: 0;
                                                    padding-right: 0;
                                                    padding-left: 0;
                                                    text-align: center;
                                                    font-size: 0;
                                                  "
                                                >
                                                  <!--[if (gte mso 9)|(IE)]>
													<table width="100%" style="border-spacing:0" >
													<tr>
													<td width="20%" valign="top" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;" >
													<![endif]-->

                                                  <div
                                                    class="column"
                                                    style="
                                                      width: 100%;
                                                      max-width: 110px;
                                                      display: inline-block;
                                                      vertical-align: top;
                                                    "
                                                  >
                                                    <table
                                                      class="contents"
                                                      style="
                                                        border-spacing: 0;
                                                        width: 100%;
                                                      "
                                                      bgcolor="#ffffff"
                                                    >
                                                      <tr>
                                                        <td
                                                          style="
                                                            padding-top: 0;
                                                            padding-bottom: 0;
                                                            padding-right: 0;
                                                            padding-left: 0;
                                                          "
                                                          align="left"
                                                        >
                                                          <a
                                                            href="https://24mobler.se"
                                                            target="_blank"
                                                            ><img
                                                              src="https://24mobler.se/wp-content/uploads/2024/04/24Mobler-Logo-1024x257.jpg"
                                                              width="110"
                                                              alt="24mobler-logo"
                                                              style="
                                                                border-width: 0;
                                                                max-width: 94px;
                                                                height: auto;
                                                                display: block;
                                                              "
                                                          /></a>
                                                        </td>
                                                      </tr>
                                                    </table>
                                                  </div>

                                                  <!--[if (gte mso 9)|(IE)]>
													</td><td width="80%" valign="top" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;" >
													<![endif]-->

                                                  <div
                                                    class="column"
                                                    style="
                                                      width: 100%;
                                                      max-width: 415px;
                                                      display: inline-block;
                                                      vertical-align: top;
                                                    "
                                                  >
                                                    <table
                                                      width="100%"
                                                      style="border-spacing: 0"
                                                      bgcolor="#ffffff"
                                                    >
                                                      <tr>
                                                        <td>
                                                          <table
                                                            width="100%"
                                                            border="0"
                                                            cellspacing="0"
                                                            cellpadding="0"
                                                            class="hide"
                                                          >
                                                            <tr>
                                                              <td height="60">
                                                                &nbsp;
                                                              </td>
                                                            </tr>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                    </table>
                                                  </div>

                                                  <!--[if (gte mso 9)|(IE)]>
													</td>
													</tr>
													</table>
													<![endif]-->
                                                </td>
                                              </tr>
                                              <tr>
                                                <td
                                                  align="left"
                                                  style="padding-left: 40px"
                                                >
                                                  <table
                                                    border="0"
                                                    cellpadding="0"
                                                    cellspacing="0"
                                                    style="
                                                      border-bottom: 2px solid
                                                        #e16a2e;
                                                    "
                                                    align="left"
                                                  >
                                                    <tr>
                                                      <td
                                                        height="20"
                                                        width="30"
                                                        style="
                                                          font-size: 20px;
                                                          line-height: 20px;
                                                        "
                                                      >
                                                        &nbsp;
                                                      </td>
                                                    </tr>
                                                  </table>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>&nbsp;</td>
                                              </tr>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </center>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- ======= end header ======= -->

                    <!-- ======= start hero image ======= --><!-- ======= end hero image ======= -->

                    <!-- ======= start hero article ======= -->

                    <table
                      class="one-column"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                      style="border-spacing: 0"
                      bgcolor="#FFFFFF"
                    >
                      <tr>
                        <td align="left" style="padding: 0px 40px 40px 40px">
                          <p
                            style="
                              color: #5b5f65;
                              font-size: 28px;
                              text-align: left;
                              font-family: Verdana, Geneva, sans-serif;
                            "
                          >
                            Hi ${name},
                          </p>
                          <p style="
                              color: #5b5f65;
                              font-size: 16px;
                              text-align: left;
                              font-family: Verdana, Geneva, sans-serif;"
                          >
                          ${Object.keys(message)?.map((key) => `${message[key]} <br />`)?.join('')}
                          </p>

                          <!-- START BUTTON -->

                          <center>
                            <table
                              cellpadding="0"
                              cellspacing="0"
                              border="0"
                              width="100%"
                            >
                              <tr>
                                <td>
                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                  >
                                    <tr>
                                      <td
                                        height="20"
                                        width="100%"
                                        style="
                                          font-size: 20px;
                                          line-height: 20px;
                                        "
                                      >
                                        &nbsp;
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </center>

                          <!-- END BUTTON -->
                        </td>
                      </tr>
                    </table>

                    <!-- ======= end hero article ======= -->

                    <!-- ======= start footer ======= -->

                    <table
                      width="100%"
                      border="0"
                      cellspacing="0"
                      cellpadding="0"
                    >
                      <tr>
                        <td>
                          <table
                            width="100%"
                            cellpadding="0"
                            cellspacing="0"
                            border="0"
                            bgcolor="#E16A2E"
                          >
                            <tr>
                              <td
                                height="40"
                                align="center"
                                bgcolor="#E16A2E"
                                class="one-column"
                              >
                                &nbsp;
                              </td>
                            </tr>
                            <tr>
                              <td
                                align="center"
                                bgcolor="#E16A2E"
                                class="one-column"
                                style="
                                  padding-top: 0;
                                  padding-bottom: 0;
                                  padding-right: 10px;
                                  padding-left: 10px;
                                "
                              >
                                <font
                                  style="
                                    font-size: 13px;
                                    text-decoration: none;
                                    color: #ffffff;
                                    font-family: Verdana, Geneva, sans-serif;
                                    text-align: center;
                                  "
                                  >Head office, Company Ltd, Address Line, 32
                                  Highway str., Manhattan, USA, 12345</font
                                >
                              </td>
                            </tr>
                            <tr>
                              <td
                                align="center"
                                bgcolor="#E16A2E"
                                class="one-column"
                                style="
                                  padding-top: 0;
                                  padding-bottom: 0;
                                  padding-right: 0;
                                  padding-left: 0;
                                "
                              >
                                &nbsp;
                              </td>
                            </tr>
                            <tr>
                              <td
                                align="center"
                                bgcolor="#E16A2E"
                                class="one-column"
                                style="
                                  padding-top: 0;
                                  padding-bottom: 0;
                                  padding-right: 0;
                                  padding-left: 0;
                                "
                              >
                                <table
                                  width="150"
                                  border="0"
                                  cellspacing="0"
                                  cellpadding="0"
                                >
                                  <tr>
                                    <td width="33" align="center">
                                      <a
                                        href="https://24mobler.se"
                                        target="_blank"
                                        ><img
                                          src="https://gallery.mailchimp.com/fdcaf86ecc5056741eb5cbc18/images/237854a9-0a06-4f88-a9b8-c36e57e31083.png"
                                          alt="facebook"
                                          width="32"
                                          height="32"
                                          border="0"
                                      /></a>
                                    </td>
                                    <td width="34" align="center">
                                      <a
                                        href="https://24mobler.se"
                                        target="_blank"
                                        ><img
                                          src="https://gallery.mailchimp.com/fdcaf86ecc5056741eb5cbc18/images/2fb3f578-f70a-41b6-9bbc-f99a174d6456.png"
                                          alt="twitter"
                                          width="32"
                                          height="32"
                                          border="0"
                                      /></a>
                                    </td>
                                    <td width="33" align="center">
                                      <a
                                        href="https://24mobler.se"
                                        target="_blank"
                                        ><img
                                          src="https://gallery.mailchimp.com/fdcaf86ecc5056741eb5cbc18/images/17c02388-c25e-4eb5-a7cc-8f34458a50ad.png"
                                          alt="linkedin"
                                          width="32"
                                          height="32"
                                          border="0"
                                      /></a>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td
                                align="center"
                                bgcolor="#E16A2E"
                                class="one-column"
                                style="
                                  padding-top: 0;
                                  padding-bottom: 0;
                                  padding-right: 0;
                                  padding-left: 0;
                                "
                              >
                                &nbsp;
                              </td>
                            </tr>
                            <tr>
                              <td
                                align="center"
                                bgcolor="#E16A2E"
                                class="one-column"
                                style="
                                  padding-top: 0;
                                  padding-bottom: 0;
                                  padding-right: 10px;
                                  padding-left: 10px;
                                "
                              >
                                <font
                                  style="
                                    font-size: 13px;
                                    text-decoration: none;
                                    color: #ffffff;
                                    font-family: Verdana, Geneva, sans-serif;
                                    text-align: center;
                                  "
                                >
                                ${year} All rights reserved.</font
                                >
                              </td>
                            </tr>
                            <tr>
                              <td
                                height="6"
                                bgcolor="#E16A2E"
                                class="contents1"
                                style="
                                  width: 100%;
                                  border-bottom-left-radius: 10px;
                                  border-bottom-right-radius: 10px;
                                "
                              ></td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <table
                            width="100%"
                            cellpadding="0"
                            cellspacing="0"
                            border="0"
                          >
                            <tr>
                              <td
                                height="6"
                                bgcolor="#E16A2E"
                                class="contents"
                                style="
                                  width: 100%;
                                  border-bottom-left-radius: 10px;
                                  border-bottom-right-radius: 10px;
                                "
                              ></td>
                            </tr>
                            <tr>
                              <td>&nbsp;</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- ======= end footer ======= -->
                  </td>
                </tr>
              </table>
              <!--[if (gte mso 9)|(IE)]>
					</td>
				</tr>
			</table>
			<![endif]-->
            </div>
          </td>
        </tr>
      </table>
    </center>
  </body>
</html>
`
export default EmailTemplate