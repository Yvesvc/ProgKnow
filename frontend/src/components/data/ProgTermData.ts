export interface ProgTermResponse {
  Id: string;
  Category: string;
  TermText: string;
  Term: Content[];
  Definition: Content[];
  AdditionalInfo: Array<Content[]>;
}

export interface Content {
  Bullet: boolean;
  Elements: element[];
}

export interface element {
  Content: string;
  Underline: boolean;
}
