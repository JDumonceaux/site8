export type Features = {
  readonly features: Feature[];
};

export type Feature = {
  readonly description?: string;
  readonly name: string;
  readonly types?: FieldType[];
};

export type FieldType = {
  readonly fields: FieldDef[];
  readonly name: string;
};

export type FieldDef = {
  readonly description?: string;
  readonly name: string;
  readonly type: string;
};
