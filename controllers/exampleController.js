const asyncHandler = require("express-async-handler");

const exampleController = asyncHandler(async (req, res) => {
    const exampleId = req.params.exampleId;

    const example = await someFunctionWhichGetsExample(exampleId)

    if (!example) { res.status(404).send('Example not found') }

    res.send(`Example found: ${example.name}`)

})

function someFunctionWhichGetsExample(id) {
    if (id == 'liam') {
        return {
            name: 'liam',
        }
    }
    if (id == 'karel') {
        return {
            name: 'karel',
        }
    }
    return undefined;
}
module.exports = exampleController;