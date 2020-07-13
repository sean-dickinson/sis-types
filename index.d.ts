/// <reference types="firebase-admin"/>

import { firestore } from "firebase-admin";
import { ROLES } from "./constants";
export type Role = typeof ROLES[number];

export type DepartureType =
  | "dismissed"
  | "graduated"
  | "mid-year withdrawl"
  | "not returning"
  | "not invited back";

export interface Course {
  ID: string;
  courseID: string;
  name: string;
  department: string;
  termLength: number;
  credit: number;
  description: string;
  requirement?: Requirement[];
  canRetakeForCredit: boolean;
  active: boolean;
  school: School;
  prerequisites: Prerequisite[];
  minClassSize: number;
  targetClassSize: number;
}

export interface SectionCountType {
  sectionID: string;
  value: -1 | 1;
}

export interface MarkList {
  [period: string]: AttendanceMark | firestore.FieldValue;
}

export interface CalculatedExcusalPeriods {
  periods: MarkList;
  fields: firestore.FieldValue[];
}

export type AttendanceCode =
  | "ABS-X"
  | "ABS-U"
  | "ABS-CUT"
  | "LT-X"
  | "LT-U"
  | "Nurse"
  | "Counselor"
  | "ABS";

export type BoardType = "5 Day" | "7 Day" | "Day";

export interface AttendanceMark {
  code: AttendanceCode;
  comment: string;
  period: string;
  section?: string;
}

export interface AdvisoryGroupedReport {
  teacher: string;
  reports: StudentReport[];
}

export interface AttendanceRecord {
  ID: string;
  name: string;
  date: string;
  isBoarder?: boolean;
  isAllDay?: boolean;
  periods: MarkList;
}

export interface CoverageRequest {
  approvalType: string;
  coveredBy: string;
  sectionID: string;
  period: string;
  sectionName: string;
  teacherName: string;
  teacherEmail: string;
  dateString: string;
  emailSent: boolean;
}

export interface InspectionRecord {
  reasons: string;
  dorm: string;
  datestring: string;
  ID: string;
  name: string;
  email: string;
  uid: string;
}

export interface PropUpdate {
  propName: string;
  propValue: any;
}

export interface RecordUpdate {
  ID: string;
  updates: PropUpdate[];
}

export interface Name {
  firstName: string;
  middleName?: string;
  lastName: string;
  suffix?: string;
  nickName?: string;
  title?: string;
}

export interface Address {
  city: string;
  country: string;
  district?: string;
  postal: string;
  state: string;
  street1: string;
  street2?: string;
  type: string;
}

export interface Permissions {
  home: PermissionsObj;
  bike: PermissionsObj;
  walk: PermissionsObj;
  car: PermissionsObj;
}

export interface PermissionsObj {
  type: string;
  allowed: boolean;
  restriction?: string;
}

export interface Student {
  address: Address;
  birthDate: string;
  boarder: BoardType;
  classOf: number;
  currentSchool: string;
  currentStudent: boolean;
  email: string;
  gender: string;
  ID: string;
  nameObj: Name;
  name: string;
  cellPhone?: string;
  feedbackEmails: string[];
  permissions: Permissions;
  enrollmentYears: string[];
  enrollments: Enrollment[];
}

export interface Enrollment {
  enrollmentDate: string;
  departure?: Departure;
}

export interface Departure {
  departureDate: string;
  departureReason: DepartureType;
}

export interface StaffMember {
  nameObj: Name;
  name: string;
  email: string;
  ID: string;
  cellPhone?: string;
  currentStaff: boolean;
  roles: Role[];
}

export interface ModuleInfo {
  title: string;
  description: string;
  icon: string;
  href: string;
  roles: Role[];
}

export interface Prerequisite {
  courseID: string;
  minGrade?: string;
}

export type Requirement = "international" | "all";

export interface Section {
  ID: string;
  period: string;
  teachers: SimpleList;
  students: SimpleSectionList;
  academicYear: string;
  name: string;
  courseID: string;
  sectionNum: number;
  terms: TermList;
  room: SimpleIndividual;
  school: School;
  feedbackOnly: boolean;
  yearLong: boolean;
}

export interface NewSection {
  ID: string;
  period: string;
  teachers: SimpleIndividual[];
  students: SimpleIndividual[];
  academicYear: string;
  name: string;
  courseID: string;
  sectionNum: number;
  terms: string[];
  room: SimpleIndividual;
  school: School;
  feedbackOnly: boolean;
  yearLong: boolean;
}

// export interface CourseRequest {}

export type School = "OFS-US" | "OFS-MS";

export interface SimpleSectionList {
  [id: string]: SectionIndividual;
}

export interface TermList {
  T1?: boolean;
  T2?: boolean;
  T3?: boolean;
}

export interface SimpleIndividual {
  ID: string;
  name: string;
}
export interface SectionIndividual extends SimpleIndividual {
  enrolled?: string;
  withdrawn?: string;
}

export interface SimpleList {
  [key: string]: SimpleIndividual;
}

export interface FeedbackReminder {
  sections: SimpleSection[];
  ID: string;
  name: string;
}

export interface SimpleSection {
  ID: string;
  courseID: string;
  name: string;
  period: string;
  teachers: SimpleList;
  terms: TermList;
}

export interface AcademicYear {
  year: string;
  T1: Term;
  T2: Term;
  T3: Term;
}

export interface Term {
  name: string;
  start: string;
  end: string;
}

export interface ScheduleDay {
  dayID?: number;
  date?: string;
  periods: PeriodList;
  isClosed?: boolean;
  school: School;
  academicYear: string;
  terms: TermList;
  ID: string;
  dayName?: string;
}

export interface NurseRecord {
  student: SimpleIndividual;
  date: string;
  timeIn: string;
  reason: string;
  timeOut?: string;
  checkedIn: boolean;
}

export interface TimeExcusal {
  ID: string;
  name: string;
  start: string;
  end: string;
  comment: string;
  code: AttendanceCode;
  includedDays: string[];
  edited: string;
  editedBy: string;
  uid: string;
}

export interface TimeExcusalRequirements {
  student: Student;
  sections: Section[];
  schedules: PeriodObj[][];
}

export interface PeriodList {
  [key: string]: PeriodObj;
}

export interface SchoolBoolean {
  "OFS-US"?: boolean;
  "OFS-MS"?: boolean;
}

export interface BooleanList {
  [key: string]: boolean;
}

export interface TimeRange {
  start: Date;
  end: Date;
}

export interface Relation {
  hasCurrentStudent: boolean;
  hasCurrentBoarder: boolean;
  email: string;
  address: Address;
  nameObj: Name;
  name: string;
  ID: string;
  relations: RelationList | RelationDepartureList;
  relationClasses: BooleanList;
  nonStudentRelations: RelationList;
  cellPhone?: string;
  homePhone?: string;
  workPhone?: string;
  affiliation?: string;
  // TODO: need to add these properties in database etc
  isInternationalFamily: boolean;
  isConsultant: boolean;
}

export interface Label {
  name: string;
  address: string;
}

export interface RelationList {
  [index: string]: SimpleRelation;
}

export interface SimpleRelation extends SimpleIndividual {
  reciprocalRelationship: string;
  livesWith: boolean;
  receivesReportCards: boolean;
  receivesFeedbackForms: boolean;
}

export interface DepartedRelation extends SimpleRelation {
  // TODO: add this logic into database, queries, etc
  departed: boolean;
  departureType: DepartureType;
}
export interface RelationDepartureList {
  [ID: string]: DepartedRelation;
}
export interface PeriodMetaItem {
  name: string;
  school: SchoolBoolean;
  terms: TermList;
  advisor: boolean;
  academicYear: string;
  nonAttendance?: boolean;
}

export interface PeriodMetaGroup {
  name: string;
  pairs: any;
}

export type MetaReportType = "advisor" | "sport" | "conflict" | "min classes";

export interface MetaReportItem {
  ID: string;
  name: string;
  periods: string[];
}

export interface SectionMetaReport {
  type: MetaReportType;
  items: MetaReportItem[];
}

export interface SectionReportColumn {
  name: string;
  type: MetaReportType[];
}

export interface PeriodObj {
  period: string;
  start: string;
  end: string;
}

export interface FeedbackForm {
  courseName: string;
  period: string;
  sectionID: string;
  school: School;
  student: SimpleIndividual;
  date: string;
  comment: string;
  processed: boolean;
  rejected?: boolean;
  rejectionReason?: string;
  teacher: SimpleIndividual;
  emails: string[];
  ID: string;
}
type SectionChangeType =
  | "student-withdrawl"
  | "student-enrollment"
  | "student-removal"
  | "teacher-added"
  | "teacher-removed"
  | "name-changed"
  | "school-changed"
  | "period-changed"
  | "terms-changed"
  | "section-created"
  | "section-deleted"
  | "room-changed"
  | "feedbackOnly-changed";

export interface SectionIndividualChange {
  sectionID: string;
  type: SectionChangeType;
  individual?: SimpleIndividual;
  date: string;
  isLateChange?: boolean;
}

export interface SectionPropChange {
  type: SectionChangeType;
  sectionID: string;
  date: string;
  property: string;
  previousValue: any;
  newValue: any;
}

export interface CoursePropChange {
  courseID: string;
  name: string;
}

export interface SectionUpdate {
  section: Section;
  isNew?: boolean;
  changes: SectionPropChange[] | SectionIndividualChange[];
}

export interface CourseGroup {
  ID: string;
  name: string;
  sections: Section[];
}

export interface PeriodGroup {
  ID: string;
  name: string;
  sections: Section[];
}

export interface SimpleEmailIndividual extends SimpleIndividual {
  email: string;
}

export interface SimpleStudent extends SimpleIndividual {
  grade: number;
}

export type MarkingColumn = "MT1" | "T1" | "MT2" | "T2" | "MT3" | "T3" | "Year";

export type Grade =
  | "A+"
  | "A"
  | "A-"
  | "B+"
  | "B"
  | "B-"
  | "C+"
  | "C"
  | "C-"
  | "D+"
  | "D"
  | "D-"
  | "F"
  | "P"
  | "I"
  | "CR";

export interface ClassReport {
  ID: string;
  section: SimpleSection;
  mark: Grade;
  comment?: string;
  student: SimpleStudent;
  academicYear: string;
  markingColumn: MarkingColumn;
  school: School;
}

export interface TermYearPair {
  term: Term;
  year: string;
}

export interface ScheduleTemplate {
  name: string;
  ID: string;
  periods: PeriodList;
  school: School;
}

export interface SchoolSched {
  periods: PeriodObj[];
  isClosed: boolean;
  term: string;
  academicYear: string;
  uid?: string;
}

export interface SchoolSchedGroup {
  "OFS-MS"?: SchoolSched;
  "OFS-US"?: SchoolSched;
}

export interface ClassNote {
  courseID: string;
  markingColumn: MarkingColumn;
  academicYear: string;
  note: string;
  ID: string;
}

export interface StudentReport {
  student: SimpleStudent;
  reports: ClassReport[];
}

export interface LabelSet {
  user: string;
  name: string;
  type: "current" | "archived";
  studentType?: "international" | "domestic";
}

export interface CurrentFamiliesLabelSet extends LabelSet {
  grades: number[];
  enrollmentType?: "new" | "returning";
  boardingStatus?: "Day" | "Boarding";
}

export interface ArchivedLabeledSet extends LabelSet {
  classOf: number[];
}

export interface RepeatedTask {
  ID: string;
  repeatFrequency: "daily" | "weekdays" | "weekly" | "monthly";
  functionName: string;
  active: boolean;
  startDate: string;
  endDate: string;
  options: any;
}

export interface OneTimeTask {
  ID: string;
  status: "scheduled" | "complete" | "error";
  functionName: string;
  triggerTime: string;
  isRepeat: boolean;
  repeatID?: string;
  options: any;
}

export interface OnCreateTask {
  type: "Section" | "Student" | "Course" | "StaffMember";
}

export interface onCreateSectionTask extends OnCreateTask {
  type: "Section";
  teachersIncludedOnFeedbacks: string[]; // Course ID array
}

export interface PromiseDict {
  [key: string]: (options?: any) => Promise<void>;
}

export interface MailgunOptions {
  to: string;
  from: string;
  cc?: string;
  bcc?: string;
  subject: string;
  text: string;
  html?: string;
}

export interface BankTransaction {
  ID: string;
  accountBalance: number;
  accountName: string;
  amount: number;
  bankBalance: number;
  timestamp: string;
}

export interface BankAccount {
  ID: string;
  archived: boolean;
  balance: number;
  created: string;
  deposits: number;
  email: string;
  limit: number;
  name: string;
  type: "Student" | "Other";
  authorizedUsers?: SimpleList;
  withdrawls: number;
}

export interface Boarder {
  ID: string;
  name: string;
  email: string;
  cellPhone?: string;
  boarder: BoardType;
  dorm: string;
  room: string;
  studyHall: StudyHallStatuses;
  permissions: Permissions;
  start?: string;
  end?: string;
  inspectionCount: number;
}

export interface StudyHallStatuses {
  ASC?: boolean;
  Turner?: boolean;
  "Non-IS"?: boolean;
}

export interface Permissions {
  home: PermissionsObj;
  bike: PermissionsObj;
  walk: PermissionsObj;
  car: PermissionsObj;
}

export interface PermissionsObj {
  type: string;
  allowed: boolean;
  restriction?: string;
}

export interface PlanTiming {
  leaveDate: string;
  returnDate: string;
}

export interface Transports {
  leaving: string;
  returning: string;
}

export interface Weekend {
  id: string;
  start: string;
  end: string;
  long: boolean;
  eot: boolean;
  trainLeave: string;
  trainReturn: string;
}

export interface WeekendPlan {
  uid: string;
  name: string;
  flags?: string[];
  studentEmail: string;
  timing?: PlanTiming;
  transports?: Transports;
  plan: string;
  weekendID: string;
  IDEmail: string;
  approved: boolean;
  denied?: boolean;
  deniedReason?: string;
}

export interface InspectionRecord {
  reasons: string;
  dorm: string;
  datestring: string;
  ID: string;
  name: string;
  email: string;
  uid: string;
}

export interface MaintenanceRequest {
  subject: string;
  requestor: string;
  message: string;
  building: string;
  roomNumber?: string;
  date: string;
}
export interface GroupedSignoutRecords {
  date: string;
  signouts: SignoutRecord[];
}

export interface SignoutRecord {
  uid?: string;
  timeOut: string;
  timeIn?: string;
  transport: string;
  destination: string;
  ID: string;
  name: string;
}

export interface TempBoarder extends Boarder {
  start: string;
  end: string;
}

export interface CampusedRecord {
  ID: string;
  name: string;
  until: string;
}

export interface TempPermissions {
  ID: string;
  name: string;
  permissions: Permissions;
}

export interface CheckedInRecord {
  ID: string;
  name: string;
  [checkIn: string]: string;
}

export type CheckIn = "dinner" | "brunch" | "studyHall" | "dorm";

export interface CheckInMap {
  dinner?: boolean;
  brunch?: boolean;
  studyHall?: boolean;
  dorm?: boolean;
}

export interface DateCheckInMap {
  [date: string]: CheckIn;
}

export interface CheckInReportRecord {
  ID: string;
  name: string;
  date: string;
  checkIns: CheckIn;
}

export interface CheckInDateRecord {
  [date: string]: CheckedInRecord[];
}

export interface CheckInTiming {
  name: string;
  start: string;
  end: string;
  type: "aod" | "regular";
}

export interface CheckInTimingMap {
  [name: string]: CheckInTiming;
}

export interface ReslifeSchedule {
  date: string;
  ID?: number;
  checkIns: CheckInTimingMap;
}

export interface CheckInReportItem {
  comment: string;
  code: string;
  iconName: string;
  name: string;
  sort: number;
  color: string;
}

export interface DateInspectionMap {
  [date: string]: string;
}

export interface GroupedCheckInRecord {
  ID: string;
  name: string;
  records: DateCheckInMap;
}

export interface GroupedInspectionRecord {
  ID: string;
  name: string;
  dorm: string;
  fails: number;
}

export interface CheckInParams {
  dorm?: string | null;
  time: string;
  name?: string;
  location?: string;
}

export interface PlanAction {
  action: string;
  selected: Boarder[] | WeekendPlan[];
}

export interface ArrivalDepature {
  name: string;
  email: string;
  isArrival: boolean;
  isDeparture: boolean;
  transport: string;
  time: string;
}

export interface GroupedPlans {
  day: string;
  plans: ArrivalDepature[];
  isEarly?: boolean;
  isLate?: boolean;
}

export interface InAppEmailData {
  emailOptions: MailgunOptions;
  sender: string;
  test: boolean;
  auth: string;
}

export interface EmailListQuery {
  grades: number[];
  boarders: BoardType[];
  includeParents: boolean;
  includeInternationalParents: boolean;
  includeStudents: boolean;
  includeConsultants: boolean;
}

export interface QueryLists {
  students?: Student[];
  relations: Relation[];
}
