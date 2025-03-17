const GetIconSetDetails = {"metadata":{"allOf":[{"type":"object","properties":{"iconset_id":{"type":"integer","format":"int32","default":1761,"minimum":-2147483648,"maximum":2147483647,"$schema":"https://json-schema.org/draft/2020-12/schema#","description":"The icon set id"}},"required":["iconset_id"]}]},"response":{"200":{"type":"object","properties":{"categories":{"type":"array","items":{"type":"object","properties":{"name":{"type":"string","examples":["Mixed"]},"identifier":{"type":"string","examples":["mixed"]}}}},"icons_count":{"type":"integer","default":0,"examples":[6]},"author":{"type":"object","properties":{"company":{"type":"string","examples":["Iconfinder"]},"username":{"type":"string","examples":["iconfinder"]},"name":{"type":"string","examples":["Martin LeBlanc"]},"is_designer":{"type":"boolean","default":true,"examples":[true]},"iconsets_count":{"type":"integer","default":0,"examples":[306]},"user_id":{"type":"integer","default":0,"examples":[14]}}},"name":{"type":"string","examples":["Iconfinder logo"]},"published_at":{"type":"string","examples":["2017-05-30T10:49:05.325"]},"iconset_id":{"type":"integer","default":0,"examples":[1761]},"type":{"type":"string","examples":["vector"]},"license":{"type":"object","properties":{"name":{"type":"string","examples":["Free for commercial use (Do not redistribute)"]},"scope":{"type":"string","examples":["free"]},"license_id":{"type":"integer","default":0,"examples":[12]}}},"readme":{"type":"string","examples":["<p>Copyright Iconfinder ApS</p>\n\n<p>You may only use these images if they are related to Iconfinder.</p>\n"]},"styles":{"type":"array","items":{"type":"object","properties":{"name":{"type":"string","examples":["Glyph"]},"identifier":{"type":"string","examples":["glyph"]}}}},"identifier":{"type":"string","examples":["iconfinder-logo"]},"website_url":{"type":"string","examples":["http://www.iconfinder.com/"]},"is_premium":{"type":"boolean","default":true,"examples":[false]},"are_all_icons_glyph":{"type":"boolean","default":true,"examples":[false]}},"$schema":"https://json-schema.org/draft/2020-12/schema#"},"400":{"type":"object","properties":{},"$schema":"https://json-schema.org/draft/2020-12/schema#"}}} as const
;
const GettingStartedWithYourApi1 = {"metadata":{"allOf":[{"type":"object","properties":{"count":{"type":"integer","format":"int32","default":10,"minimum":-2147483648,"maximum":2147483647,"$schema":"https://json-schema.org/draft/2020-12/schema#","description":"Number of icon sets to include in the result. Accepted values are between 1 and 100."},"after":{"type":"integer","format":"int32","minimum":-2147483648,"maximum":2147483647,"$schema":"https://json-schema.org/draft/2020-12/schema#","description":"Icon set ID of the last icon set received. If empty, the count most recently published icon sets are returned."},"premium":{"type":"string","$schema":"https://json-schema.org/draft/2020-12/schema#","description":"Filter premium icon sets. all or empty value - Include all icon sets no matter if they are premium or not. 0 or false - Only include icon sets that are not premium, ie. may require purchasing a license for specific use cases but are not sold directly on the Iconfinder marketplace. 1 or true - Only include premium icon sets, that are sold directly on the Iconfinder marketplace."},"vector":{"type":"string","$schema":"https://json-schema.org/draft/2020-12/schema#","description":"Filter vector icon sets. all or empty value - Include all icon sets no matter if they are vector or raster icon sets. 0 or false - Only include raster icon sets in the result. 1 or true - Only include vector icon sets in the result."},"license":{"type":"string","$schema":"https://json-schema.org/draft/2020-12/schema#","description":"Filter by license scope. none or empty value - Include all icon sets no matter the license. commercial - Only include icon sets that can be used commercially, but may require attribution or be restricted by other licensing concerns. commercial-nonattribution - Only include icon sets that be used commercially without any attribution requirements."}},"required":[]}]},"response":{"200":{"type":"object","properties":{"iconsets":{"type":"array","items":{"type":"object","properties":{"categories":{"type":"array","items":{}},"icons_count":{"type":"integer","default":0,"examples":[25]},"author":{"type":"object","properties":{"company":{"type":"string","examples":["1DollarIcon"]},"username":{"type":"string","examples":["1DollarIcon"]},"name":{"type":"string","examples":["Rizwan Abbasi"]},"is_designer":{"type":"boolean","default":true,"examples":[true]},"iconsets_count":{"type":"integer","default":0,"examples":[648]},"user_id":{"type":"integer","default":0,"examples":[1188405]}}},"name":{"type":"string","examples":["Insurance"]},"published_at":{"type":"string","examples":["2020-06-29T11:37:05.491Z"]},"iconset_id":{"type":"integer","default":0,"examples":[195129]},"type":{"type":"string","examples":["vector"]},"styles":{"type":"array","items":{}},"identifier":{"type":"string","examples":["insurance-101"]},"is_premium":{"type":"boolean","default":true,"examples":[true]},"prices":{"type":"array","items":{"type":"object","properties":{"price":{"type":"integer","default":0,"examples":[25]},"currency":{"type":"string","examples":["USD"]},"license":{"type":"object","properties":{"name":{"type":"string","examples":["Basic license"]},"scope":{"type":"string","examples":["free"]},"license_id":{"type":"integer","default":0,"examples":[71]},"url":{"type":"string","examples":["https://www.iconfinder.com/licenses/basic"]}}}}}},"are_all_icons_glyph":{"type":"boolean","default":true,"examples":[false]}}}},"total_count":{"type":"integer","default":0,"examples":[123537]}},"$schema":"https://json-schema.org/draft/2020-12/schema#"},"400":{"type":"object","properties":{},"$schema":"https://json-schema.org/draft/2020-12/schema#"}}} as const
;
const ListAUsersIconSets = {"metadata":{"allOf":[{"type":"object","properties":{"user_id":{"type":"string","default":"14","$schema":"https://json-schema.org/draft/2020-12/schema#","description":"The id of the user"}},"required":["user_id"]},{"type":"object","properties":{"count":{"type":"integer","format":"int32","default":10,"minimum":-2147483648,"maximum":2147483647,"$schema":"https://json-schema.org/draft/2020-12/schema#","description":"Number of icon sets to include in the result. Accepted values are between 1 and 100."},"after":{"type":"integer","format":"int32","minimum":-2147483648,"maximum":2147483647,"$schema":"https://json-schema.org/draft/2020-12/schema#","description":"Icon set ID of the last icon set received. If empty, the count most recently published icon sets are returned."},"premium":{"type":"string","$schema":"https://json-schema.org/draft/2020-12/schema#","description":"Filter premium icon sets. all or empty value - Include all icon sets no matter if they are premium or not. 0 or false - Only include icon sets that are not premium, ie. may require purchasing a license for specific use cases but are not sold directly on the Iconfinder marketplace. 1 or true - Only include premium icon sets, that are sold directly on the Iconfinder marketplace."},"vector":{"type":"string","$schema":"https://json-schema.org/draft/2020-12/schema#","description":"Filter vector icon sets. all or empty value - Include all icon sets no matter if they are vector or raster icon sets. 0 or false - Only include raster icon sets in the result. 1 or true - Only include vector icon sets in the result."},"license":{"type":"string","$schema":"https://json-schema.org/draft/2020-12/schema#","description":"Filter by license scope. none or empty value - Include all icon sets no matter the license. commercial - Only include icon sets that can be used commercially, but may require attribution or be restricted by other licensing concerns. commercial-nonattribution - Only include icon sets that be used commercially without any attribution requirements."}},"required":[]}]},"response":{"200":{"type":"object","properties":{"iconsets":{"type":"array","items":{"type":"object","properties":{"categories":{"type":"array","items":{}},"icons_count":{"type":"integer","default":0,"examples":[25]},"name":{"type":"string","examples":["Women and Men"]},"published_at":{"type":"string","examples":["2020-04-07T12:02:27.164Z"]},"iconset_id":{"type":"integer","default":0,"examples":[181335]},"type":{"type":"string","examples":["vector"]},"styles":{"type":"array","items":{}},"identifier":{"type":"string","examples":["women-and-men-1"]},"is_premium":{"type":"boolean","default":true,"examples":[true]},"prices":{"type":"array","items":{"type":"object","properties":{"price":{"type":"integer","default":0,"examples":[10]},"currency":{"type":"string","examples":["USD"]},"license":{"type":"object","properties":{"name":{"type":"string","examples":["Basic license"]},"scope":{"type":"string","examples":["free"]},"license_id":{"type":"integer","default":0,"examples":[71]},"url":{"type":"string","examples":["https://www.iconfinder.com/licenses/basic"]}}}}}},"are_all_icons_glyph":{"type":"boolean","default":true,"examples":[false]}}}},"total_count":{"type":"integer","default":0,"examples":[306]}},"$schema":"https://json-schema.org/draft/2020-12/schema#"},"400":{"type":"object","properties":{},"$schema":"https://json-schema.org/draft/2020-12/schema#"}}} as const
;
const ListAnAuthorsIconSets = {"metadata":{"allOf":[{"type":"object","properties":{"author_id":{"type":"integer","format":"int32","default":1,"minimum":-2147483648,"maximum":2147483647,"$schema":"https://json-schema.org/draft/2020-12/schema#","description":"The author id"}},"required":["author_id"]},{"type":"object","properties":{"count":{"type":"integer","format":"int32","default":10,"minimum":-2147483648,"maximum":2147483647,"$schema":"https://json-schema.org/draft/2020-12/schema#","description":"Number of icon sets to include in the result. Accepted values are between 1 and 100."},"after":{"type":"integer","format":"int32","minimum":-2147483648,"maximum":2147483647,"$schema":"https://json-schema.org/draft/2020-12/schema#","description":"Icon set ID of the last icon set received. If empty, the count most recently published icon sets are returned."},"premium":{"type":"string","$schema":"https://json-schema.org/draft/2020-12/schema#","description":"Filter premium icon sets. all or empty value - Include all icon sets no matter if they are premium or not. 0 or false - Only include icon sets that are not premium, ie. may require purchasing a license for specific use cases but are not sold directly on the Iconfinder marketplace. 1 or true - Only include premium icon sets, that are sold directly on the Iconfinder marketplace."},"vector":{"type":"string","$schema":"https://json-schema.org/draft/2020-12/schema#","description":"Filter vector icon sets. all or empty value - Include all icon sets no matter if they are vector or raster icon sets. 0 or false - Only include raster icon sets in the result. 1 or true - Only include vector icon sets in the result."},"license":{"type":"string","$schema":"https://json-schema.org/draft/2020-12/schema#","description":"Filter by license scope. none or empty value - Include all icon sets no matter the license. commercial - Only include icon sets that can be used commercially, but may require attribution or be restricted by other licensing concerns. commercial-nonattribution - Only include icon sets that be used commercially without any attribution requirements."}},"required":[]}]},"response":{"200":{"type":"object","properties":{"iconsets":{"type":"array","items":{"type":"object","properties":{"categories":{"type":"array","items":{"type":"object","properties":{"name":{"type":"string","examples":["Mixed"]},"identifier":{"type":"string","examples":["mixed"]}}}},"icons_count":{"type":"integer","default":0,"examples":[278]},"name":{"type":"string","examples":["Nuove"]},"published_at":{"type":"string","examples":["2009-11-29T13:33:46Z"]},"iconset_id":{"type":"integer","default":0,"examples":[2]},"type":{"type":"string","examples":["raster"]},"license":{"type":"object","properties":{"name":{"type":"string","examples":["LGPL"]},"scope":{"type":"string","examples":["free"]},"license_id":{"type":"integer","default":0,"examples":[21]},"url":{"type":"string","examples":["http://www.gnu.org/licenses/lgpl.html"]}}},"styles":{"type":"array","items":{"type":"object","properties":{"name":{"type":"string","examples":["3D"]},"identifier":{"type":"string","examples":["3d"]}}}},"identifier":{"type":"string","examples":["nuove"]},"website_url":{"type":"string","examples":["http://www.kde-look.org/content/show.php/nuoveXT+2?content=62630"]},"is_premium":{"type":"boolean","default":true,"examples":[false]},"are_all_icons_glyph":{"type":"boolean","default":true,"examples":[false]}}}},"total_count":{"type":"integer","default":0,"examples":[3]}},"$schema":"https://json-schema.org/draft/2020-12/schema#"},"400":{"type":"object","properties":{},"$schema":"https://json-schema.org/draft/2020-12/schema#"}}} as const
;
const ListIconSetsInACategory = {"metadata":{"allOf":[{"type":"object","properties":{"category_identifier":{"type":"string","default":"arrow","$schema":"https://json-schema.org/draft/2020-12/schema#","description":"The category identifier"}},"required":["category_identifier"]},{"type":"object","properties":{"count":{"type":"integer","format":"int32","default":10,"minimum":-2147483648,"maximum":2147483647,"$schema":"https://json-schema.org/draft/2020-12/schema#","description":"Number of icon sets to include in the result. Accepted values are between 1 and 100."},"after":{"type":"string","$schema":"https://json-schema.org/draft/2020-12/schema#","description":"Icon set ID of the last icon set received. If empty, the count most recently published icon sets are returned."},"premium":{"type":"string","$schema":"https://json-schema.org/draft/2020-12/schema#","description":"Filter premium icon sets. all or empty value - Include all icon sets no matter if they are premium or not. 0 or false - Only include icon sets that are not premium, ie. may require purchasing a license for specific use cases but are not sold directly on the Iconfinder marketplace. 1 or true - Only include premium icon sets, that are sold directly on the Iconfinder marketplace."},"vector":{"type":"string","$schema":"https://json-schema.org/draft/2020-12/schema#","description":"Filter vector icon sets. all or empty value - Include all icon sets no matter if they are vector or raster icon sets. 0 or false - Only include raster icon sets in the result. 1 or true - Only include vector icon sets in the result."},"license":{"type":"string","$schema":"https://json-schema.org/draft/2020-12/schema#","description":"Filter by license scope. none or empty value - Include all icon sets no matter the license. commercial - Only include icon sets that can be used commercially, but may require attribution or be restricted by other licensing concerns. commercial-nonattribution - Only include icon sets that be used commercially without any attribution requirements."}},"required":[]}]},"response":{"200":{"type":"object","properties":{"iconsets":{"type":"array","items":{"type":"object","properties":{"categories":{"type":"array","items":{"type":"object","properties":{"name":{"type":"string","examples":["Arrows"]},"identifier":{"type":"string","examples":["arrow"]}}}},"icons_count":{"type":"integer","default":0,"examples":[50]},"author":{"type":"object","properties":{"company":{"type":"string","examples":["Cornucopia"]},"username":{"type":"string","examples":["BaconTaco"]},"name":{"type":"string","examples":["Jesus Chavarria"]},"is_designer":{"type":"boolean","default":true,"examples":[true]},"iconsets_count":{"type":"integer","default":0,"examples":[64]},"user_id":{"type":"integer","default":0,"examples":[1111996]}}},"name":{"type":"string","examples":["Arrows"]},"published_at":{"type":"string","examples":["2020-05-07T19:19:47.667Z"]},"iconset_id":{"type":"integer","default":0,"examples":[183079]},"type":{"type":"string","examples":["vector"]},"styles":{"type":"array","items":{}},"identifier":{"type":"string","examples":["arrows-305"]},"is_premium":{"type":"boolean","default":true,"examples":[true]},"prices":{"type":"array","items":{"type":"object","properties":{"price":{"type":"integer","default":0,"examples":[25]},"currency":{"type":"string","examples":["USD"]},"license":{"type":"object","properties":{"name":{"type":"string","examples":["Basic license"]},"scope":{"type":"string","examples":["free"]},"license_id":{"type":"integer","default":0,"examples":[71]},"url":{"type":"string","examples":["https://www.iconfinder.com/licenses/basic"]}}}}}},"are_all_icons_glyph":{"type":"boolean","default":true,"examples":[false]}}}},"total_count":{"type":"integer","default":0,"examples":[1114]}},"$schema":"https://json-schema.org/draft/2020-12/schema#"},"400":{"type":"object","properties":{},"$schema":"https://json-schema.org/draft/2020-12/schema#"}}} as const
;
const ListIconSetsOfASpecificStyle1 = {"metadata":{"allOf":[{"type":"object","properties":{"style_identifier":{"type":"string","default":"outline","$schema":"https://json-schema.org/draft/2020-12/schema#","description":"The style identifier. Available style identifiers can be retrieved with the `/styles` endpoint."}},"required":["style_identifier"]},{"type":"object","properties":{"count":{"type":"integer","format":"int32","default":10,"minimum":-2147483648,"maximum":2147483647,"$schema":"https://json-schema.org/draft/2020-12/schema#","description":"Number of icon sets to include in the result. Accepted values are between 1 and 100."},"after":{"type":"integer","format":"int32","minimum":-2147483648,"maximum":2147483647,"$schema":"https://json-schema.org/draft/2020-12/schema#","description":"Icon set ID of the last icon set received. If empty, the count most recently published icon sets are returned."},"premium":{"type":"string","$schema":"https://json-schema.org/draft/2020-12/schema#","description":"Filter premium icon sets. all or empty value - Include all icon sets no matter if they are premium or not. 0 or false - Only include icon sets that are not premium, ie. may require purchasing a license for specific use cases but are not sold directly on the Iconfinder marketplace. 1 or true - Only include premium icon sets, that are sold directly on the Iconfinder marketplace."},"vector":{"type":"string","$schema":"https://json-schema.org/draft/2020-12/schema#","description":"Filter vector icon sets. all or empty value - Include all icon sets no matter if they are vector or raster icon sets. 0 or false - Only include raster icon sets in the result. 1 or true - Only include vector icon sets in the result."},"license":{"type":"string","$schema":"https://json-schema.org/draft/2020-12/schema#","description":"Filter by license scope. none or empty value - Include all icon sets no matter the license. commercial - Only include icon sets that can be used commercially, but may require attribution or be restricted by other licensing concerns. commercial-nonattribution - Only include icon sets that be used commercially without any attribution requirements."}},"required":[]}]},"response":{"200":{"type":"object","properties":{"iconsets":{"type":"array","items":{"type":"object","properties":{"categories":{"type":"array","items":{"type":"object","properties":{"name":{"type":"string","examples":["Business & management"]},"identifier":{"type":"string","examples":["business-management"]}}}},"icons_count":{"type":"integer","default":0,"examples":[111]},"author":{"type":"object","properties":{"company":{"type":"string","examples":["Rank Sol"]},"username":{"type":"string","examples":["promotionking"]},"name":{"type":"string","examples":["Rank Sol"]},"is_designer":{"type":"boolean","default":true,"examples":[true]},"iconsets_count":{"type":"integer","default":0,"examples":[702]},"user_id":{"type":"integer","default":0,"examples":[863131]}}},"name":{"type":"string","examples":["Trade and Finance"]},"published_at":{"type":"string","examples":["2020-06-12T12:33:38.047Z"]},"iconset_id":{"type":"integer","default":0,"examples":[163187]},"type":{"type":"string","examples":["vector"]},"styles":{"type":"array","items":{"type":"object","properties":{"name":{"type":"string","examples":["Outline"]},"identifier":{"type":"string","examples":["outline"]}}}},"identifier":{"type":"string","examples":["trade-and-finance-1"]},"is_premium":{"type":"boolean","default":true,"examples":[true]},"prices":{"type":"array","items":{"type":"object","properties":{"price":{"type":"integer","default":0,"examples":[19]},"currency":{"type":"string","examples":["USD"]},"license":{"type":"object","properties":{"name":{"type":"string","examples":["Basic license"]},"scope":{"type":"string","examples":["free"]},"license_id":{"type":"integer","default":0,"examples":[71]},"url":{"type":"string","examples":["https://www.iconfinder.com/licenses/basic"]}}}}}},"are_all_icons_glyph":{"type":"boolean","default":true,"examples":[false]}}}},"total_count":{"type":"integer","default":0,"examples":[37127]}},"$schema":"https://json-schema.org/draft/2020-12/schema#"},"400":{"type":"object","properties":{},"$schema":"https://json-schema.org/draft/2020-12/schema#"}}} as const
;
export { GetIconSetDetails, GettingStartedWithYourApi1, ListAUsersIconSets, ListAnAuthorsIconSets, ListIconSetsInACategory, ListIconSetsOfASpecificStyle1 }
