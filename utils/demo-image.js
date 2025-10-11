
const validator = {
  "image": {
    "rules": [
      {
        "format": "file"
      }
    ],
    "title": "上传图片",
    "label": "上传图片"
  },
  "resultName": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "title": "识别结果名称",
    "label": "识别结果名称"
  },
  "resultRate": {
    "rules": [
      {
        "format": "double"
      }
    ],
    "title": "识别准确率",
    "label": "识别准确率"
  },
  "resultDes": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "title": "识别结果描述",
    "label": "识别结果描述"
  }
}

const enumConverter = {}

function filterToWhere(filter, command) {
  let where = {}
  for (let field in filter) {
    let { type, value } = filter[field]
    switch (type) {
      case "search":
        if (typeof value === 'string' && value.length) {
          where[field] = new RegExp(value)
        }
        break;
      case "select":
        if (value.length) {
          let selectValue = []
          for (let s of value) {
            selectValue.push(command.eq(s))
          }
          where[field] = command.or(selectValue)
        }
        break;
      case "range":
        if (value.length) {
          let gt = value[0]
          let lt = value[1]
          where[field] = command.and([command.gte(gt), command.lte(lt)])
        }
        break;
      case "date":
        if (value.length) {
          let [s, e] = value
          let startDate = new Date(s)
          let endDate = new Date(e)
          where[field] = command.and([command.gte(startDate), command.lte(endDate)])
        }
        break;
      case "timestamp":
        if (value.length) {
          let [startDate, endDate] = value
          where[field] = command.and([command.gte(startDate), command.lte(endDate)])
        }
        break;
    }
  }
  return where
}

export { validator, enumConverter, filterToWhere }
