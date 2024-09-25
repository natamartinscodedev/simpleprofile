"use client";

import React, { useState } from "react";
import CardPlan from "@/components/CardPlans";
import { CircleCheck } from "lucide-react";

const Plans = ({ email, nameLink }) => {

  return (
    <div className="container_plans">
      <CardPlan
        tipePlan="Simple"
        price={"Free"}
        state={false}
        idPlans="id_plans-free"
        email={email}
        nameLink={nameLink}
        stateLink={false}
      >
        <li>
          <CircleCheck size={20} />
          tsete01
        </li>
        <li>
          <CircleCheck size={20} />
          teste02
        </li>
        <li>
          <CircleCheck size={20} />
          teste03
        </li>
        <li>
          <CircleCheck size={20} />
          teste03
        </li>
        <li>
          <CircleCheck size={20} />
          teste03
        </li>
      </CardPlan>
      <CardPlan
        tipePlan="Gold"
        price={"149,99"}
        state={true}
        idPlans="id_plans-gold"
        email={email}
        nameLink={nameLink}
        disable={true}
        stateLink={false}
      >
        <li>
          <CircleCheck size={20} />
          tsete01
        </li>
        <li>
          <CircleCheck size={20} />
          teste02
        </li>
        <li>
          <CircleCheck size={20} />
          teste03
        </li>
        <li>
          <CircleCheck size={20} />
          teste03
        </li>
        <li>
          <CircleCheck size={20} />
          teste03
        </li>
        <li>
          <CircleCheck size={20} />
          teste03
        </li>
      </CardPlan>
    </div>
  );
};

export default Plans;
