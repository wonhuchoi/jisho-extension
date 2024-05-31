const express = require('express');
const axios = require('axios');
const JishoAPI = require('unofficial-jisho-api');
const app = express();
const port = process.env.PORT || 3000;

app.get('/jp', (req, res) => {
    try {
        let query = req.query.word;
            console.log(query);
        if(!query) {
            throw err;
        }
        let url = "https://jisho.org/api/v1/search/words?keyword=" + query;
        console.log(url);
        // res.send(url)
        let result = axios({
            method: 'get',
            url:url,
            headers: {
                "User-Agent":'wonhu',
                "Access-Control-Allow-Origin": '*'
            }
            // params: {
            //   ID: 12345
            // }
        })
        .then(function (response) {
            // console.log(response);
            res.send(response.data);
        });
        //   res.send(result);
        // httpGetAsync("https://jisho.org/api/v1/search/words?keyword=" + query, handleJishoGet);
    //   res.send('Hello World!')
    } catch (err) {
        res.status(500).send('Problems happend');
    }1
})


const handleJishoGet = (result) => {
    // if(result == null) {
    //     res = ""
    //     hoverBlock.style.display = "none";
    //     return;
    // } else {
    //     res = formatText(result);
    // }
    // // console.log(result);
    // $('#hoverPopup')
    // .text(res)
    // .css({
    //     top: cr[0].top-$('#hoverPopup').outerHeight(),
    //     left: cr[0].left
    // })
    // .show();
}


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})