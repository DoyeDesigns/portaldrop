const send = (req, res) => {
    res.status(201).json('Sent successfully....!');
}

const get = (req, res) => {
    res.status(201).json('Gotten successfully....!');
}

module.exports = {
    send,
    get
}