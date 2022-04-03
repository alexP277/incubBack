import express, {Request, Response} from 'express'
import cors from 'cors'
import {videos} from "./something";

const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3002
//sudo killall -9 node
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) => {
    res.send('Hello: World!!!!!!!!!!!')
})

/** @GET_ALL */

app.get('/videos', (req: Request, res: Response) => {
    res.send(videos)
})

/** @GET_CURRENT */

app.get('/videos/:id', (req: Request, res: Response) => {
    const {id} = req.params
    const currentVideo = videos.find(video => video.id === +id);
    res.send(currentVideo)
})

/** @CREATE */

app.post('/videos', (req: Request, res: Response) => {
    const newVideo = {
        id: +(new Date()),
        title: req.body.title,
        author: 'it-incubator.eu'
    }
    videos.push(newVideo)
    res.send(200)
})

/** @UPDATE */

app.put('/videos', (req: Request, res: Response) => {
    debugger
    const {id} = req.body;
    const findVideo = videos.find(video => video.id === +id)
    const newVideo = {...findVideo, title: req.body.title}
    res.send(newVideo)
})

/** @DELETE */

app.delete('/videos/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const newDeletedVideo = videos.filter(video => video.id !== Number(id))
    res.send(newDeletedVideo)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})