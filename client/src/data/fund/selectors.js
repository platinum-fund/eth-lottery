import { path } from 'ramda'export const getTotalInvestors = path(['fund', 'totalInvestors'])export const getFundBalance = path(['fund', 'fundBalance'])export const getDonated = path(['fund', 'donated'])export const getPaid = path(['fund', 'paid'])export const getRecentTransactions = path(['fund', 'recentTransactions'])