import { Validators } from '@angular/forms';

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
          // TODO:
        };
        break;
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
  other = 'other',

  rival = 'rival',
  business = 'business'
}

export enum operationTypes {
  'auth-presale' = 'auth-presale',
  'project-backup' = 'project-backup',
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
    text: '指派售前'
  },
  {
    operationType: operationTypes['project-backup'],
    icon: 'operate-project-backup',
    text: '项目报备'
  },
  {
    operationType: operationTypes['apply-architect'],
    icon: 'operate-apply-architect',
    text: '申请架构师'
  },
  {
    operationType: operationTypes['apply-poc'],
    icon: 'operate-apply-poc',
    text: '申请POC'
  },
  {
    operationType: operationTypes['upload-record'],
    icon: 'operate-upload-record',
    text: '上传拜访记录'
  },
  {
    operationType: operationTypes['upload-meetingMinutes'],
    icon: 'operate-upload-meetingMinutes',
    text: '上传会议纪要'
  },
  {
    operationType: operationTypes['close-business'],
    icon: 'operate-close-business',
    text: '关闭商机'
  }
];

export enum progressTypes {
  // TODO: match the types in api
  all = 'all',
  poc = 'poc',
  architect = 'architect',
  visits = 'visit-resords',
  records = 'meeting-minutes'
}
