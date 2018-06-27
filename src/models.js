const model1 = `{
    "nodes": [
      {
        "bias": 0,
        "type": "input",
        "squash": "LOGISTIC",
        "mask": 1,
        "index": 0
      },
      {
        "bias": 0,
        "type": "input",
        "squash": "LOGISTIC",
        "mask": 1,
        "index": 1
      },
      {
        "bias": 0,
        "type": "input",
        "squash": "LOGISTIC",
        "mask": 1,
        "index": 2
      },
      {
        "bias": 0,
        "type": "input",
        "squash": "LOGISTIC",
        "mask": 1,
        "index": 3
      },
      {
        "bias": 0,
        "type": "input",
        "squash": "LOGISTIC",
        "mask": 1,
        "index": 4
      },
      {
        "bias": 0.11605920197892533,
        "type": "hidden",
        "squash": "INVERSE",
        "mask": 1,
        "index": 5
      },
      {
        "bias": 0.004033729810071496,
        "type": "hidden",
        "squash": "INVERSE",
        "mask": 1,
        "index": 6
      },
      {
        "bias": 0.004033729810071496,
        "type": "hidden",
        "squash": "INVERSE",
        "mask": 1,
        "index": 7
      },
      {
        "bias": 0.08533197418005192,
        "type": "hidden",
        "squash": "SELU",
        "mask": 1,
        "index": 8
      },
      {
        "bias": 0.008289781366484533,
        "type": "hidden",
        "squash": "SELU",
        "mask": 1,
        "index": 9
      },
      {
        "bias": -0.08849366032099,
        "type": "hidden",
        "squash": "INVERSE",
        "mask": 1,
        "index": 10
      },
      {
        "bias": -0.08849366032099,
        "type": "hidden",
        "squash": "RELU",
        "mask": 1,
        "index": 11
      },
      {
        "bias": 0.828185084326658,
        "type": "output",
        "squash": "IDENTITY",
        "mask": 1,
        "index": 12
      },
      {
        "bias": -0.5837708282756243,
        "type": "output",
        "squash": "TANH",
        "mask": 1,
        "index": 13
      },
      {
        "bias": 0.246029762562189,
        "type": "output",
        "squash": "STEP",
        "mask": 1,
        "index": 14
      }
    ],
    "connections": [
      {
        "weight": 1.5620682048100325,
        "from": 7,
        "to": 7,
        "gater": null
      },
      {
        "weight": 1,
        "from": 8,
        "to": 8,
        "gater": null
      },
      {
        "weight": -0.08536162668439409,
        "from": 12,
        "to": 14,
        "gater": null
      },
      {
        "weight": -0.08536162668439409,
        "from": 11,
        "to": 13,
        "gater": null
      },
      {
        "weight": 0.16213886196117686,
        "from": 10,
        "to": 13,
        "gater": null
      },
      {
        "weight": -0.025720941327676175,
        "from": 8,
        "to": 14,
        "gater": null
      },
      {
        "weight": -0.04860559109997351,
        "from": 13,
        "to": 8,
        "gater": null
      },
      {
        "weight": -0.004292524723790783,
        "from": 14,
        "to": 7,
        "gater": null
      },
      {
        "weight": 0.08297743489579243,
        "from": 7,
        "to": 13,
        "gater": null
      },
      {
        "weight": 0.3122763269997086,
        "from": 5,
        "to": 14,
        "gater": null
      },
      {
        "weight": 0.022933731388944348,
        "from": 7,
        "to": 12,
        "gater": 5
      },
      {
        "weight": 0.017890855727256127,
        "from": 8,
        "to": 11,
        "gater": null
      },
      {
        "weight": -0.07803852634875615,
        "from": 9,
        "to": 10,
        "gater": 13
      },
      {
        "weight": -0.4710701017408451,
        "from": 12,
        "to": 7,
        "gater": null
      },
      {
        "weight": 0.005786064084444001,
        "from": 14,
        "to": 5,
        "gater": null
      },
      {
        "weight": -0.08891426578117775,
        "from": 4,
        "to": 14,
        "gater": null
      },
      {
        "weight": 0.005786064084444001,
        "from": 13,
        "to": 5,
        "gater": null
      },
      {
        "weight": -0.04316095661423232,
        "from": 5,
        "to": 12,
        "gater": null
      },
      {
        "weight": -0.32620656490083777,
        "from": 2,
        "to": 14,
        "gater": null
      },
      {
        "weight": 0.021553982420578197,
        "from": 4,
        "to": 12,
        "gater": null
      },
      {
        "weight": -0.04316095661423232,
        "from": 5,
        "to": 11,
        "gater": null
      },
      {
        "weight": 0.03738567068377882,
        "from": 6,
        "to": 7,
        "gater": null
      },
      {
        "weight": -0.028063133712295102,
        "from": 0,
        "to": 12,
        "gater": null
      },
      {
        "weight": -0.08974755539610851,
        "from": 3,
        "to": 9,
        "gater": null
      },
      {
        "weight": -0.028063133712295102,
        "from": 0,
        "to": 11,
        "gater": null
      },
      {
        "weight": -1.169498704321942,
        "from": 3,
        "to": 6,
        "gater": null
      },
      {
        "weight": -1.169498704321942,
        "from": 3,
        "to": 5,
        "gater": null
      },
      {
        "weight": 2.748836388728127,
        "from": 1,
        "to": 5,
        "gater": null
      },
      {
        "weight": 0.03758774605138465,
        "from": 0,
        "to": 5,
        "gater": null
      }
    ],
    "input": 5,
    "output": 3,
    "dropout": 0
  }`