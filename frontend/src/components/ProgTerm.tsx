import React, { TouchEvent } from 'react';
import { Component } from 'react';
import AdditionalInfo from './AdditionalInfo';
import Definition from './Definition';
import Term from './Term';
import Category from './Category';
import { ProgTermResponse } from './data/ProgTermData';
import AsyncSelect from 'react-select/async';
import { SingleValue } from 'react-select';
import { HttpRequest, HttpResponse } from '../Http';
import { Authentication } from './Authentication';
import Report from './ReportTerm';
import 'bootstrap/dist/css/bootstrap.min.css';

export type ProgTermResponseOption = {
  readonly value: string;
  readonly label: string;
};

interface IProps {}

interface IState {
  objectId: string;
}

export default class ProgTerm extends Component<IProps, IState> {
  Category: React.RefObject<Category>;
  Term: React.RefObject<Term>;
  Definition: React.RefObject<Definition>;
  AdditionalInfo: React.RefObject<AdditionalInfo>;

  touchStartX: number = 0;
  touchStartY: number = 0;
  touchEndX: number = 0;
  touchEndY: number = 0;

  constructor(prop: any) {
    super(prop);
    this.state = {
      objectId: '',
    };
    this.Category = React.createRef();
    this.Term = React.createRef();
    this.Definition = React.createRef();
    this.AdditionalInfo = React.createRef();
    this.HandleTouchStart = this.HandleTouchStart.bind(this);
    this.HandleTouchEnd = this.HandleTouchEnd.bind(this);
    this.LoadOptions = this.LoadOptions.bind(this);
    this.OnChangeHandler = this.OnChangeHandler.bind(this);
  }

  componentDidMount(): void {
    this.GetRandomProgTerm();
  }

  async GetRandomProgTerm(): Promise<void> {
    let request: HttpRequest<ProgTermResponse> = new HttpRequest('api/progterms/random');
    let response: HttpResponse<ProgTermResponse> = await request.SendAsync();

    if (response.ok) {
      this.InsertDataIntoSubComponents(response.body as ProgTermResponse);
    } else {
      console.log('error');
    }
  }

  async GetPreviousProgTerm(): Promise<void> {
    let request: HttpRequest<ProgTermResponse> = new HttpRequest('api/progterms/previous?id=' + this.state.objectId);
    let response: HttpResponse<ProgTermResponse> = await request.SendAsync();

    if (response.ok) {
      this.InsertDataIntoSubComponents(response.body as ProgTermResponse);
    } else {
      console.log('error');
    }
  }

  async GetNextProgTerm(): Promise<void> {
    let request: HttpRequest<ProgTermResponse> = new HttpRequest('api/progterms/next?id=' + this.state.objectId);
    let response: HttpResponse<ProgTermResponse> = await request.SendAsync();

    if (response.ok) {
      this.InsertDataIntoSubComponents(response.body as ProgTermResponse);
    } else {
      console.log('error');
    }
  }

  InsertDataIntoSubComponents(randomProgTerm: ProgTermResponse) {
    this.setState({ objectId: randomProgTerm.Id });
    this.Category.current?.SetCategory(randomProgTerm.Category);
    this.Term.current?.SetTerm(randomProgTerm.Term);
    this.Definition.current?.SetDefinition(randomProgTerm.Definition);
    this.AdditionalInfo.current?.SetAdditionalInfo(randomProgTerm.AdditionalInfo);
  }

  HandleTouchStart(touchevent: TouchEvent<HTMLDivElement>) {
    const firstTouchEvent = touchevent.touches[0];
    this.touchStartX = firstTouchEvent.clientX;
    this.touchStartY = firstTouchEvent.clientY;
  }

  HandleTouchEnd(touchevent: TouchEvent<HTMLDivElement>) {
    const firstTouchEvent = touchevent.changedTouches[0];
    this.touchEndX = firstTouchEvent.clientX;
    this.touchEndY = firstTouchEvent.clientY;

    const diffX = this.touchEndX - this.touchStartX;
    const diffY = this.touchEndY - this.touchStartY;

    if (Math.abs(diffX) > 90) {
      if (diffX > 0) {
        this.GetNextProgTerm();
      } else {
        this.GetPreviousProgTerm();
      }
    } else if (diffY < -200) {
      this.GetRandomProgTerm();
    }
  }

  async LoadOptions(inputValue: string): Promise<ProgTermResponseOption[]> {
    if (inputValue.length > 2) {
      let request: HttpRequest<ProgTermResponse[]> = new HttpRequest<ProgTermResponse[]>(
        'api/progterms/search?q=' + inputValue,
      );
      let response: HttpResponse<ProgTermResponse[]> = await request.SendAsync();

      if (response.ok) {
        return this.ProgTermResponsesToOptions(response.body as ProgTermResponse[]);
      } else {
        console.log('error');
      }
    }
    return [];
  }
  ProgTermResponsesToOptions(result: ProgTermResponse[]): ProgTermResponseOption[] {
    let resulta: ProgTermResponseOption[] = [];
    result.forEach((item) => {
      resulta.push({ value: item.Id, label: item.TermText });
    });
    return resulta;
  }

  async OnChangeHandler(event: SingleValue<ProgTermResponseOption>): Promise<void> {
    let request: HttpRequest<ProgTermResponse> = new HttpRequest('api/progterms/' + event?.value);
    let response: HttpResponse<ProgTermResponse> = await request.SendAsync();

    if (response.ok) {
      this.InsertDataIntoSubComponents(response.body as ProgTermResponse);
    } else {
      console.log('error');
    }
  }

  render() {
    return (
      <div>
        <div className="container" id="header">
          <div className="row bg-light">
            <div className="col-4 fs-4">ProgKnow</div>

            <AsyncSelect className="col-6" loadOptions={this.LoadOptions} onChange={this.OnChangeHandler} />
            <div className="col-2 pt-1">
              <Authentication />
            </div>
          </div>
        </div>

        <div className="m-3" onTouchStart={this.HandleTouchStart} onTouchEnd={this.HandleTouchEnd}>
          <Category ref={this.Category}></Category>
          <div className="container">
            <Term ref={this.Term}></Term>
            {this.state.objectId != '' && <Report objectId={this.state.objectId} />}
          </div>

          <div className="mb-3 mt-3">
            <Definition ref={this.Definition}></Definition>
          </div>
          <AdditionalInfo ref={this.AdditionalInfo}></AdditionalInfo>
        </div>
      </div>
    );
  }
}
