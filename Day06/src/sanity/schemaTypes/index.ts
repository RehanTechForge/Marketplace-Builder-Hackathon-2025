import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { productType } from "./productType";
import { customerType } from "./customerType";
import { orderType } from "./orderType";
import { orderItemType } from "./orderItemType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, productType, customerType, orderType],
};
