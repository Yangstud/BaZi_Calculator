import React from 'react';
import { LunarDate, SolarTerms, Gender } from '../types';

interface LunarInfoProps {
  lunarDate: LunarDate;
  solarTerms: SolarTerms;
  gender: Gender;
}

export function LunarInfo({ lunarDate, solarTerms, gender }: LunarInfoProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">农历日期</h3>
          <p className="text-gray-600">
            农历 {lunarDate.year}年 {lunarDate.month}月 {lunarDate.day}日
            {lunarDate.isLeapMonth && ' (闰月)'}
          </p>
          <p className="text-gray-600">生肖：{lunarDate.yearAnimal}</p>
          <p className="text-gray-600">性别：{gender === 'male' ? '男' : '女'}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">节气</h3>
          <p className="text-gray-600">当前：{solarTerms.currentTerm}</p>
          <p className="text-gray-600">下一个：{solarTerms.nextTerm}</p>
          <p className="text-gray-600">时间：{solarTerms.nextTermDate}</p>
        </div>
      </div>
    </div>
  );
}