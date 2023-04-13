import { Router } from "express";

const dictionaryRouter = Router()


dictionaryRouter.get('/:word([a-zA-Z]+)', (req,res) => {
    const word = req.params.word;
    res.send(word);
});

export default dictionaryRouter;