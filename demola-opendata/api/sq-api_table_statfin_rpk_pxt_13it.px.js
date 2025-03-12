export const crimeRate = {"queryObj":{
  "query": [
    {
      "code": "Kuukausi",
      "selection": {
        "filter": "item",
        "values": [

          "2024M10",
          "2024M11",
          "2024M12"
        ]
      }
    },
    {
      "code": "Kunta",
      "selection": {
        "filter": "item",
        "values": [
          "SSS",
          "KU020",


        ]
      }
    },
    {
      "code": "Rikosryhmä ja teonkuvauksen tarkenne",
      "selection": {
        "filter": "item",
        "values": [
          "101T103",
          "121T122",
          "131T132",
          "201_202_205",
          "231T241",
          "301T321",
          "501",
          "502",
          "331T332",
          "451_452_456T458"
        ]
      }
    }
  ],
  "response": {
    "format": "json-stat2"
  }
},"tableIdForQuery":"statfin_rpk_pxt_13it.px"}