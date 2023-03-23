import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Label, ToggleSwitch } from "flowbite-react";

export function Questionaires({ proposalId = 0 }) {
  const dispatch = useDispatch();
  const { proposalInput } = useSelector((state: RootState) => state.proposal);
  const [switch1, setSwitch1] = useState(false);
  const [switch2, setSwitch2] = useState(false);
  const [switch3, setSwitch3] = useState(false);
  const [switch4, setSwitch4] = useState(false);
  const [switch5, setSwitch5] = useState(false);
  const [switch6, setSwitch6] = useState(false);
  const [switch7, setSwitch7] = useState(false);

  return (
    <div className="border border-gray-200 p-2.5 rounded-md shadow-md mt-3">
      <h3 className="bg-slate-100 p-2 text-cyan-600 mb-3 text-2xl">
        Questionaires
      </h3>

      <Label>
        <div className="flex flex-row px-4 border-b border-slate-200 pb-3 mb-2">
          <p className="basis-4/5">
            Does the proposer answer all Questionnaire in this proposal form ?
          </p>
          <div>
            <ToggleSwitch
              className="basis-1/5"
              checked={switch1}
              label=""
              onChange={setSwitch1}
            />
          </div>
        </div>
      </Label>

      <Label>
        <div className="flex flex-row px-4 border-b border-slate-200 pb-3 mb-2">
          <p className="basis-4/5">
            Does the proposer answer the occupation and annual income?
          </p>
          <div>
            <ToggleSwitch
              className="basis-1/5"
              checked={switch2}
              label=""
              onChange={setSwitch2}
            />
          </div>
        </div>
      </Label>

      <Label>
        <div className="flex flex-row px-4 border-b border-slate-200 pb-3 mb-2">
          <p className="basis-4/5">
            Does FA/UM/BM fill up FA report properly and completely ?
          </p>
          <div>
            <ToggleSwitch
              className="basis-1/5"
              checked={switch3}
              label=""
              onChange={setSwitch3}
            />
          </div>
        </div>
      </Label>

      <Label>
        <div className="flex flex-row px-4 border-b border-slate-200 pb-3 mb-2">
          <p className="basis-4/5">
            Have you checked and confirmed that the Proposer marked NO answers in all Health/Medical questionnaire in this proposal form ?
          </p>
          <div>
            <ToggleSwitch
              className="basis-1/5"
              checked={switch4}
              label=""
              onChange={setSwitch4}
            />
          </div>
        </div>
      </Label>

      <Label>
        <div className="flex flex-row px-4 border-b border-slate-200 pb-3 mb-2">
          <p className="basis-4/5">
            Have you confirmed that there is not any incomplete or unacceptable answer of the Insurance Proposal Form and Health Questionnaire ?
          </p>
          <div>
            <ToggleSwitch
              className="basis-1/5"
              checked={switch5}
              label=""
              onChange={setSwitch5}
            />
          </div>
        </div>
      </Label>

      <Label>
        <div className="flex flex-row px-4 border-b border-slate-200 pb-3 mb-2">
          <p className="basis-4/5">
            This Proposal does not Require DGH ?
          </p>
          <div>
            <ToggleSwitch
              className="basis-1/5"
              checked={switch6}
              label=""
              onChange={setSwitch6}
            />
          </div>
        </div>
      </Label>

      <Label>
        <div className="flex flex-row px-4 border-b border-slate-200 pb-3 mb-2">
          <p className="basis-4/5">
            Do you want to provide underwriting decisions now ?
          </p>
          <div>
            <ToggleSwitch
              className="basis-1/5"
              checked={switch7}
              label=""
              onChange={setSwitch7}
            />
          </div>
        </div>
      </Label>
    </div>
  );
}
