export type Features = {
  readonly features: Feature[];
};

export type Feature = {
  readonly name?: string;
  readonly description?: string;
  readonly types?: FieldType[];
};

export type FieldType = {
  readonly name: string;
  readonly fields: FieldDef[];
};

export type FieldDef = {
  readonly name: string;
  readonly type: string;
  readonly description?: string;
};
