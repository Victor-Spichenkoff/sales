import { Router, Request, Response } from 'express'
import { isTokenValid } from "../controllers/auth.controller"
import { editAction as editUser, getStates, info, signIn, signUp } from "../controllers/user.controller"
import { AddAction, getCategories, getItem, getList, editAction as editAds } from '../controllers/ads.controller'
import { localStrategyLogin } from '../lib/passport-local'
import { jwtStrategyMiddleware } from '../lib/passport-jwt'
import { getAllUsers } from '../controllers/bugFix.controller'


const router = Router()

router.get('/', (req, res) => res.send("Olá, Mundo!"))

router.get('/teste', (req: Request, res: Response) => res.send('Olá'))


//--------------------------------------------
// User
//--------------------------------------------
router.get('/states', getStates)

router.get('/private', jwtStrategyMiddleware, (req, res) => res.send("Tem permissão"))




router.post('/isTokenValid', isTokenValid)


router.post("/user/signin", localStrategyLogin)


router.post("/user/signup", signUp)

router.route("/user/me")
    .get(info)
    .put(editUser)



//--------------------------------------------
// ADS
//--------------------------------------------
router.get('/category', getCategories)

router.get('/ad/add', AddAction)
router.get('/ad/list', getList)
router.get('/ad/item', getItem)
router.post('/ad/:id', editAds)



//rota de testes
router.get('/users/nhe', getAllUsers)


export default router