import { Router } from "express"

const router = Router();

router.route('/').get((req, res) => {
    res.json({
        "Status": 200,
        "Response": "Register!"
    });
});

export { router as registrationRouter };
