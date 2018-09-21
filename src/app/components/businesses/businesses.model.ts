import { Validators } from '@angular/forms';
import { validate } from 'tdc-ui';

export enum statusEnum {
  normal = 'NORMAL',
  lose = 'LOSE',
  discard = 'DISCARD',
  review = 'REVIEW'
}

export class BusinessDetails {
  application: string; // 客户应用 ,
  applicationSupplier: string; // 应用厂商 ,
  architect: number; // 架构师 ,
  changeTime: number; // 发生时间 ,
  company: string; // 项目所属公司 ,
  contractAmount: number; // 预计签约金额 ,
  contractTime: number; // 预计签约时间 ,
  createTime: number; // 创建日期 ,
  creator: string; // 创建人 ,
  customerContactsId: number; // 客户联系人ID ,
  customerContactsName: string; // 最终用户联系人 ,
  customerContactsPost: string; // 最终用户职位 ,
  customerId: number; // 客户ID ,
  customerName: string; // 最终用户 ,
  id: number; // ID ,
  itInput: number; // 近两年IT投入平均金额 ,
  lastContactTime: number; // 最后联系时间 ,
  meeting: number; // 会议纪要 ,
  modify: string; // 上次修改人 ,
  modifyTime: number; // 上次修改日期 ,
  name: string; // 名称 ,
  needDev: boolean; // 是否应用开发 ,
  needMigration: boolean; // 是否应用迁移 ,
  nextContactTime: number; // 下次联系时间 ,
  noContactDuration: number; // 未联系时间，单位为天 ,
  nodeCount: number; // 预计总节点数 ,
  partnerBusiness: string; // 合作伙伴主营业务 ,
  partnerContactsId: number; // 合作伙伴联系人ID ,
  partnerContactsName: string; // 合作伙伴联系人 ,
  partnerContactsPost: string; // 合作伙伴职位 ,
  partnerId: number; // 合作伙伴ID ,
  partnerIndustry: string; // 合作伙伴所属行业 ,
  partnerMarketShare: string; // 合作伙伴所属行业市场占有率 ,
  partnerName: string; // 合作伙伴 ,
  partnerSubdivisionMarket: string; // 合作伙伴细分市场 ,
  plGrossProfitCheck: string; // PL毛利核算表 ,
  poc: number; // POC ,
  preSales: string[]; // 售前负责人 ,
  preSignedContractType: string; // 预签合同类型 ,
  product: string; // 意向产品 ,
  record: number; // 全部记录 ,
  revenueAmount: number; // 预计收入金额 ,
  rivalList: Array<Rival>; // 竞争厂商 ,
  sales: string; // 销售负责人 ,
  salesName: string; // 销售负责人 ,
  softwareInput: number; // 近两年IT投入平均金额 ,
  stage: 'YANG'|'GEN'|'DA'|'CHENG'; // 阶段 ,YANG(养单),GEN(跟单),DA(打单),CHENG(成单), = ['YANG', 'GEN', 'DA', 'CHENG'],
  status: 'NORMAL'|'LOSE'|'DISCARD'|'REVIEW'; // 状态 ,NORMAL(正常),LOSE(丢单),DISCARD(弃单),REVIEW(进入合同评审)
  strategic: string; // 战略意义 ,
  successRate: number; // 预计成功率 ,
  suggest: string; // 建议及说明 ,
  supplierSuggest: string; // 对其它厂商反馈意见 ,
  unfinished: string []; // 未完善信息 ,
  visitRecord: number; // 拜访记录

  static getAddControlGroup(editType) {
    let modelObj = {};
    switch (editType) {
      case editTypes['rival']:
        modelObj = {
          'name': ['', Validators.required],
          'quote': ['', Validators.required],
          'reason': ['', Validators.required],
          'info': ['', Validators.required]
        };
        break;
      default:
        break;
    }
    return modelObj;
  }

  static getEditControlGroup(editType) {
    let modelObj = {};

    switch (editType) {
      case editTypes['voided']:
        modelObj = {
          'status': '',
          'reason': ['', Validators.required],
          'rival': null
        };
        break;
      default:
        break;
    }
    return modelObj;
  }

  static getOperationGroup(operationType) {
    let modelObj = {};

    switch (operationType) {
      case operationTypes['auth-presale']:
        modelObj = {
          userId: ['', Validators.required]
        };
        break;
      case operationTypes['project-filing']:
        modelObj = {
          // "businessId": 0, // TODO
          entryTime: ['' ],
          estimatedTime: ['', Validators.required],
          explain: [''],
          procurementMode: ['', Validators.required],
          projectName: [''],
          signingMode: ['', Validators.required],
          stage: ['']
        };
        break;
      case operationTypes['apply-architect']:
        modelObj = {
          businessId: [''],
          demand: [ [], Validators.required],
          estimateTime: ['', Validators.required],
          place: ['', Validators.required],
          purpose: ['', Validators.required]
        };
        break;
      case operationTypes['apply-poc']:
        modelObj = {
          businessId: [''],
          demandReportId: [],
          estimateTime: [ '', Validators.required],
          place: [ '', Validators.required],
          testCaseId: []
        };
        break;
      case operationTypes['upload-record']:
        modelObj = {
          // createTime: ['', Validators.required],  must be now
          estimatedTime: ['', Validators.required], // *预计时间
          feedback: ['', Validators.required],  // *对方反馈
          fellowStaff: [''],  // 随行人员
          plan: ['', Validators.required],  // *下一步工作计划
          progress: ['', Validators.required],  // 进展情况
          respondent: ['', Validators.required],  // *受访人
          subject: ['', Validators.required], // *事由
          visitTime: ['', Validators.required]  // *拜访时间
        };
        break;
      case operationTypes['upload-meetingMinutes']:
        modelObj = {
          // creator: ['', Validators.required],
          info: ['', Validators.required],  // *项目关键信息
          orientation: [''], // 客户倾向性
          participants: ['', Validators.required],  // *参与人
          plan: [''],      // 后续计划
          status: [''],  // 当前状态
          // time: ['', Validators.required]
        };
        break;
      // covered by edit
      // case operationTypes['close-business']:
      default:
        break;
    }
    return modelObj;
  }
}

export class Rival {
  businessId: number; // 商机ID ,
  id: number; // ID ,
  info: string; // 竞争对手信息 ,
  name: string; // 竞争对手客户名 ,
  quote: number; // 对手报价 ,
  reason: string; // 原因
}

export class BusinessFilter {
  pageNum: number;
  pageSize: number;
  name?: string;
  mode?: string;
  open = true;
}

export enum editTypes {
  basic = 'basic',
  application = 'application',
  customer = 'customer',
  partner = 'partner',
  voided = 'voided',
  reEnable = 're-enable',
  other = 'other',

  rival = 'rival',
  business = 'business'
}

export enum operationTypes {
  'auth-presale' = 'auth-presale',
  'project-filing' = 'project-filing',
  'apply-architect' = 'apply-architect',
  'apply-poc' = 'apply-poc',
  'upload-record' = 'upload-record',
  'upload-meetingMinutes' = 'upload-meetingMinutes',
  'close-business' = 'close-business'
}

export const operations = [
  // TODO: get the texts translated.
  {
    operationType: operationTypes['auth-presale'],
    icon: 'operate-auth-presale',
    text: '指派售前',
    disabled: false
  },
  {
    operationType: operationTypes['project-filing'],
    icon: 'operate-project-filing',
    text: '项目报备',
    disabled: false
  },
  {
    operationType: operationTypes['apply-architect'],
    icon: 'operate-apply-architect',
    text: '申请架构师',
    disabled: false
  },
  {
    operationType: operationTypes['apply-poc'],
    icon: 'operate-apply-poc',
    text: '申请POC',
    disabled: false
  },
  {
    operationType: operationTypes['upload-record'],
    icon: 'operate-upload-record',
    text: '上传拜访记录',
    disabled: false
  },
  {
    operationType: operationTypes['upload-meetingMinutes'],
    icon: 'operate-upload-meetingMinutes',
    text: '上传会议纪要',
    disabled: false
  },
  {
    operationType: operationTypes['close-business'],
    icon: 'operate-close-business',
    text: '关闭商机',
    disabled: false
  }
];

export enum progressTypes {
  // TODO: match the types in api
  all = '',
  poc = 'POC',
  architect = 'ARCHITECT',
  visits = 'VISIT',
  meeting = 'MEETING',
  filing = 'PROJECT_FILING'
}

// presales
export class User {
  base: string; // BASE地:SHANGHAI(上海),BEIJING(北京), = ['SHANGHAI', 'BEIJING'],
  buddy: number; // Buddy ,
  email: string; // 电子邮箱，通常为key@transwarp.io ,
  gender: string; // 性别:MALE(男性),FEMALE(女性), = ['MALE', 'FEMALE'],
  id: number; //  ID ,
  key: string; // Key，通常为拼音，名.姓 ,
  manager: number; //  Manager ,
  name: string; // 姓名 ,
  officeLocation: string; // 办公地 ,
  phone: string; // 手机号 ,
  /**
   * 岗位:BD(商务拓展),TME(技术市场工程师),MANAGEMENT(管理),TECHNICAL(技术),
   * ARCHITECT(架构师),PRE_SALES(售前工程师),SALES(销售),OPERATIONS(运营),
   * ASSISTANT(助理), =
   * ['BD', 'TME', 'MANAGEMENT', 'TECHNICAL', 'ARCHITECT', 'PRE_SALES', 'SALES', 'OPERATIONS', 'ASSISTANT'],
  **/
  post: string;
  /**
   * 状态:FORMAL(正式员工),PROBATION(试用期员工),INTERNSHIP(实习员工),DISABLE(离职员工),PREPARE_FORMAL(待入职正式员工),
   * PREPARE_INTERNSHIP(待入职实习员工),CANCEL(取消入职), = ['FORMAL', 'PROBATION',
   * 'INTERNSHIP', 'DISABLE', 'PREPARE_FORMAL', 'PREPARE_INTERNSHIP', 'CANCEL'],
   */
  status: string;
  travelApproval: number; //  差旅审批人 ,
  workNumber: string; // 工号
}
